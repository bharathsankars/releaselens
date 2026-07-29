import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import { healthRouter } from "./features/health/health.routes.js";
import { releaseRouter } from "./features/release/release.routes.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { requestIdMiddleware } from "./middleware/request-id.middleware.js";

export const createApp = (): Express => {
  const app = express();

  app.disable("x-powered-by");

  app.use(helmet());

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );

  app.use(requestIdMiddleware);
  app.use(loggerMiddleware);
  app.use(express.json({ limit: "1mb" }));

  app.use("/api/v1/health", healthRouter);
  app.use("/api/v1/releases", releaseRouter);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};