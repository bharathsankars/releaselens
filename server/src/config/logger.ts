import pino, { type LoggerOptions } from "pino";

import { env } from "./env.js";

const loggerOptions: LoggerOptions = {
  level: env.NODE_ENV === "production" ? "info" : "debug",
  base: {
    service: "releaselens-api",
    environment: env.NODE_ENV,
  },
  ...(env.NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }
    : {}),
};

export const logger = pino(loggerOptions);