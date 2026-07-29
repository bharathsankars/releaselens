export type ReleaseStatus =
  | "DRAFT"
  | "IN_PROGRESS"
  | "READY_FOR_APPROVAL"
  | "APPROVED"
  | "SCHEDULED"
  | "DEPLOYING"
  | "DEPLOYED"
  | "FAILED"
  | "ROLLED_BACK";

export type ReleaseRiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface Release {
  _id: string;
  name: string;
  version: string;
  description?: string;
  status: ReleaseStatus;
  riskLevel: ReleaseRiskLevel;
  plannedReleaseDate: string;
  actualReleaseDate?: string;
  ownerId: string;
  services: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReleasesResponse {
  data: Release[];
  meta: {
    count: number;
    requestId: string;
  };
}