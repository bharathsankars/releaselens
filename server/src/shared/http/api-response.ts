import type { Response } from "express";

interface ApiResponseOptions<T> {
  response: Response;
  statusCode: number;
  data: T;
  requestId: string;
}

export const sendSuccess = <T>({
  response,
  statusCode,
  data,
  requestId,
}: ApiResponseOptions<T>): void => {
  response.status(statusCode).json({
    data,
    meta: {
      requestId,
    },
  });
};