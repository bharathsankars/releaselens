import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { AppError } from "../shared/errors/app-error.js";

export const validate =
  (schema: ZodType) =>
  (
    request: Request,
    _response: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse({
      body: request.body ?? {},
      params: request.params ?? {},
      query: request.query ?? {},
    });

    if (!result.success) {
      next(
        new AppError({
          statusCode: 400,
          code: "VALIDATION_ERROR",
          message: "Request validation failed.",
          details: result.error.flatten(),
        }),
      );

      return;
    }

    next();
  };