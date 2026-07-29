import type { IncomingMessage } from "node:http";

import type { Request } from "express";
import { pinoHttp } from "pino-http";

import { logger } from "../config/logger.js";

const getRequestId = (request: IncomingMessage): string =>
  (request as Request).requestId;

export const loggerMiddleware = pinoHttp({
  logger,

  genReqId: (request) => getRequestId(request),

  customProps: (request) => ({
    requestId: getRequestId(request),
  }),

  customSuccessMessage: (request, response) =>
    `${request.method ?? "UNKNOWN"} ${request.url ?? "UNKNOWN"} completed with ${response.statusCode}`,

  customErrorMessage: (request, response, error) =>
    `${request.method ?? "UNKNOWN"} ${request.url ?? "UNKNOWN"} failed with ${response.statusCode}: ${error.message}`,

  serializers: {
    req(request) {
      return {
        id: request.id,
        method: request.method,
        url: request.url,
      };
    },

    res(response) {
      return {
        statusCode: response.statusCode,
      };
    },
  },
});