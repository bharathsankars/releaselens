import type { ErrorRequestHandler } from "express";
import { logger } from "../config/logger.js";

import { env } from "../config/env.js";
import { AppError } from "../shared/errors/app-error.js";

interface ErrorResponseBody {
  error: {
    code: string;
    message: string;
    requestId: string;
    details?: unknown;
    stack?: string;
  };
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: unknown,
  request,
  response,
  _next,
): void => {
  const appError =
    error instanceof AppError
      ? error
      : new AppError({
          statusCode: 500,
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
          isOperational: false,
        });

  const responseBody: ErrorResponseBody = {
    error: {
      code: appError.code,
      message: appError.message,
      requestId: request.requestId,
    },
  };

  if (appError.details !== undefined) {
    responseBody.error.details = appError.details;
  }

  if (env.NODE_ENV === "development" && appError.stack) {
    responseBody.error.stack = appError.stack;
  }

  if (!appError.isOperational) {
    logger.error(
      {
        requestId: request.requestId,
        method: request.method,
        path: request.originalUrl,
        err: error,
      },
      "Unhandled application error",
    );
  }

  response.status(appError.statusCode).json(responseBody);
};
