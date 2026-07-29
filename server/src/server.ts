import type { Server } from "node:http";

import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

const app = createApp();

let server: Server | undefined;
let isShuttingDown = false;

const startServer = (): void => {
  server = app.listen(env.PORT, () => {
    logger.info(
      {
        port: env.PORT,
        environment: env.NODE_ENV,
      },
      "ReleaseLens API started",
    );
  });
};

const shutdown = (signal: NodeJS.Signals): void => {
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

  if (!server) {
    process.exitCode = 0;
    return;
  }

  server.close((error) => {
    if (error) {
      logger.error(
        {
          err: error,
        },
        "Failed to close HTTP server cleanly",
      );

      process.exitCode = 1;
      return;
    }

    logger.info("HTTP server closed");
    process.exitCode = 0;
  });
};

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

startServer();