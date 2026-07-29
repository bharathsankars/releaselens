import { Router } from "express";

import { validate } from "../../middleware/validation.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import {
  createRelease,
  getReleases,
} from "./release.controller.js";
import { createReleaseSchema } from "./schemas/create-release.schema.js";

export const releaseRouter = Router();

releaseRouter.get("/", asyncHandler(getReleases));

releaseRouter.post(
  "/",
  validate(createReleaseSchema),
  asyncHandler(createRelease),
);