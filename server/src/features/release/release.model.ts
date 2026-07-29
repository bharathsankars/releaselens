import { model, Schema } from "mongoose";

import {
  RELEASE_RISK_LEVELS,
  type ReleaseRiskLevel,
} from "./constants/release-risk-level.js";
import {
  RELEASE_STATUSES,
  type ReleaseStatus,
} from "./constants/release-status.js";
import type { Release } from "./release.types.js";

const releaseSchema = new Schema<Release>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    version: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: Object.values(RELEASE_STATUSES),
      default: RELEASE_STATUSES.DRAFT,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: Object.values(RELEASE_RISK_LEVELS),
      default: RELEASE_RISK_LEVELS.MEDIUM,
      required: true,
    },

    plannedReleaseDate: {
      type: Date,
      required: true,
    },

    actualReleaseDate: {
      type: Date,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    services: {
      type: [String],
      default: [],
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

releaseSchema.index(
  {
    version: 1,
  },
  {
    unique: true,
  },
);

releaseSchema.index({
  status: 1,
  plannedReleaseDate: 1,
});

export const ReleaseModel = model<Release>("Release", releaseSchema);