import type { Request, Response } from "express";

import { env } from "../../config/env.js";
import { sendSuccess } from "../../shared/http/api-response.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";

export const getHealth = asyncHandler(
  async (request: Request, response: Response) => {
    sendSuccess({
      response,
      statusCode: 200,
      data: {
        status: "ok",
        service: "releaselens-api",
        environment: env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      requestId: request.requestId,
    });
  },
);