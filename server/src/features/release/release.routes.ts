import { Router } from "express";

import { validate } from "../../middleware/validation.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import {
  createRelease,
  getReleaseById,
  getReleases,
} from "./release.controller.js";
import { createReleaseSchema } from "./schemas/create-release.schema.js";
import { releaseIdSchema } from "./schemas/release-id.schema.js";

export const releaseRouter = Router();

releaseRouter.get("/", asyncHandler(getReleases));

releaseRouter.get(
  "/:releaseId",
  validate(releaseIdSchema),
  asyncHandler(getReleaseById),
);

releaseRouter.post(
  "/",
  validate(createReleaseSchema),
  asyncHandler(createRelease),
);