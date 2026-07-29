import { randomUUID } from "node:crypto";

import type {
  NextFunction,
  Request,
  Response,
} from "express";

const REQUEST_ID_HEADER = "x-request-id";

export const requestIdMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const incomingRequestId =
    request.header(REQUEST_ID_HEADER);

  const requestId =
    incomingRequestId &&
    incomingRequestId.trim().length > 0
      ? incomingRequestId
      : randomUUID();

  request.requestId = requestId;

  response.setHeader(
    REQUEST_ID_HEADER,
    requestId,
  );

  next();
};