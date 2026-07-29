import { apiClient } from "../../../shared/api/api-client";
import type { HealthResponse } from "../types/health.types";

export const getHealth = () => {
  return apiClient<HealthResponse>("/health");
};