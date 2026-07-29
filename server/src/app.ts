import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";

import { env } from "./config/env.js";

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

  app.use(express.json({ limit: "1mb" }));

  app.get("/api/v1/health", (_request: Request, response: Response) => {
    response.status(200).json({
      status: "ok",
      service: "releaselens-api",
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};