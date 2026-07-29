import type { Types } from "mongoose";

import type { ReleaseRiskLevel } from "./constants/release-risk-level.js";
import type { ReleaseStatus } from "./constants/release-status.js";

export interface Release {
  _id: Types.ObjectId;
  name: string;
  version: string;
  description?: string;
  status: ReleaseStatus;
  riskLevel: ReleaseRiskLevel;
  plannedReleaseDate: Date;
  actualReleaseDate?: Date;
  ownerId: Types.ObjectId;
  services: string[];
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}