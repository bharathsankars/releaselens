import { Types } from "mongoose";
import { AppError } from "../../shared/errors/app-error.js";

import { RELEASE_STATUSES } from "./constants/release-status.js";
import {
  type CreateReleaseData,
  releaseRepository,
} from "./release.repository.js";
import type { Release } from "./release.types.js";

export type CreateReleaseInput = Omit<CreateReleaseData, "status">;

export const releaseService = {
  async createRelease(data: CreateReleaseInput): Promise<Release> {
    const existingRelease = await releaseRepository.findOne({
      version: data.version,
    });

    if (existingRelease) {
      throw new AppError({
        statusCode: 409,
        code: "RELEASE_ALREADY_EXISTS",
        message: `Release version '${data.version}' already exists.`,
      });
    }

    return releaseRepository.create({
      ...data,
      status: RELEASE_STATUSES.DRAFT,
    });
  },
  async getReleases(): Promise<Release[]> {
  return releaseRepository.findAll();
},

async getReleaseById(id: Types.ObjectId): Promise<Release> {
  const release = await releaseRepository.findById(id);

  if (!release) {
    throw new AppError({
      statusCode: 404,
      code: "RELEASE_NOT_FOUND",
      message: "Release was not found.",
    });
  }

  return release;
},

};