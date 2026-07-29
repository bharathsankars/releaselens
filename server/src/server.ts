import type { Server } from "node:http";

import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

let server: Server | undefined;

const startServer = (): void => {
  server = app.listen(env.PORT, () => {
    console.log(
      `ReleaseLens API listening on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`,
    );
  });
};

const shutdown = (signal: NodeJS.Signals): void => {
  console.log(`${signal} received. Starting graceful shutdown.`);

  if (!server) {
    process.exit(0);
  }

  server.close((error) => {
    if (error) {
      console.error("Failed to close HTTP server cleanly:", error);
      process.exit(1);
    }

    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();