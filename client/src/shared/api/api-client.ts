const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not configured.");
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly requestId?: string;

  public constructor({
    message,
    status,
    code,
    requestId,
  }: {
    message: string;
    status: number;
    code?: string;
    requestId?: string;
  }) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
    requestId?: string;
  };
}

export const apiClient = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const body = (await response
      .json()
      .catch(() => ({}))) as ApiErrorResponse;

    throw new ApiError({
      status: response.status,
      message: body.error?.message ?? "The API request failed.",
      ...(body.error?.code !== undefined
        ? { code: body.error.code }
        : {}),
      ...(body.error?.requestId !== undefined
        ? { requestId: body.error.requestId }
        : {}),
    });
  }

  return response.json() as Promise<T>;
}