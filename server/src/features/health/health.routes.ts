import { Router } from "express";

import { validate } from "../../middleware/validation.middleware.js";
import { getHealth } from "./health.controller.js";
import { healthSchema } from "./schemas/health.schema.js";

export const healthRouter = Router();

healthRouter.get(
  "/",
  validate(healthSchema),
  getHealth,
);