import { apiClient } from "../../../shared/api/api-client";
import type {
  Release,
  ReleaseRiskLevel,
} from "../types/release.types";

const DEVELOPMENT_USER_ID = "64b64c2f9f1b2c0012a34567";

export interface CreateReleasePayload {
  name: string;
  version: string;
  description?: string;
  riskLevel: ReleaseRiskLevel;
  plannedReleaseDate: string;
  services: string[];
}

interface CreateReleaseResponse {
  data: Release;
  meta: {
    requestId: string;
  };
}

export const createRelease = (
  payload: CreateReleasePayload,
): Promise<CreateReleaseResponse> => {
  return apiClient<CreateReleaseResponse>("/releases", {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      ownerId: DEVELOPMENT_USER_ID,
      createdBy: DEVELOPMENT_USER_ID,
      updatedBy: DEVELOPMENT_USER_ID,
    }),
  });
};