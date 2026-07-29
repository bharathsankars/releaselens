import type { Request, Response } from "express";

import { env } from "../../config/env.js";

export const getHealth = (request: Request, response: Response,): void => {
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
};
