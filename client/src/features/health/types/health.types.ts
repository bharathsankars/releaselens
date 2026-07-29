export interface HealthResponse {
  data: {
    status: string;
    service: string;
    environment: string;
    timestamp: string;
  };

  meta: {
    requestId: string;
  };
}