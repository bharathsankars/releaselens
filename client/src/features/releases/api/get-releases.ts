import { apiClient } from "../../../shared/api/api-client";
import type { ReleasesResponse } from "../types/release.types";

export const getReleases = (): Promise<ReleasesResponse> => {
  return apiClient<ReleasesResponse>("/releases");
};