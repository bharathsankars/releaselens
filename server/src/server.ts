import type { Server } from "node:http";

import { createApp } from "./app.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./config/database.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

const app = createApp();

let server: Server | undefined;
let isShuttingDown = false;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    server = app.listen(env.PORT, () => {
      logger.info(
        {
          port: env.PORT,
          environment: env.NODE_ENV,
        },
        "ReleaseLens API started",
      );
    });
  } catch (error) {
    logger.fatal(
      {
        err: error,
      },
      "Failed to start ReleaseLens API",
    );

    process.exitCode = 1;
  }
};

const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  logger.info(
    {
      signal,
    },
    "Starting graceful shutdown",
  );

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });

      logger.info("HTTP server closed");
    }

    await disconnectDatabase();

    process.exitCode = 0;
  } catch (error) {
    logger.error(
      {
        err: error,
      },
      "Graceful shutdown failed",
    );

    process.exitCode = 1;
  }
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

void startServer();