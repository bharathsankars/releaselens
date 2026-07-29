import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
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

  app.get("/api/v1/health", (request: Request, response: Response) => {
    response.status(200).json({
      data: {
        status: "ok",
        service: "releaselens-api",
        environment: env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      meta: {
        requestId: request.requestId,
      },
    });
  });

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};