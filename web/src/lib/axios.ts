import axios, { type AxiosError } from 'axios';
import { mapHttpError, mapNetworkError } from '@/errors/error-mapper';

interface ApiErrorResponse {
  error: {
    statusCode: number;
    message: string | string[];
  };
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data.data,
  (error: AxiosError<ApiErrorResponse>) => {
    if (!error.response) {
      return Promise.reject(mapNetworkError());
    }
    const statusCode = error.response.status;
    const rawMessage = error.response.data?.error?.message;
    const url = error.config?.url;
    return Promise.reject(mapHttpError(statusCode, rawMessage, url));
  },
);

// Typed HTTP helpers — services import these, never the raw apiClient.
// The `as unknown as Promise<T>` cast is intentional: the response interceptor
// unwraps { data: T } → T, but axios generics don't model that transformation.
export const http = {
  get: <T>(url: string, params?: Record<string, unknown>): Promise<T> =>
    apiClient.get(url, { params }) as unknown as Promise<T>,
  post: <T>(url: string, data?: unknown): Promise<T> =>
    apiClient.post(url, data) as unknown as Promise<T>,
  put: <T>(url: string, data?: unknown): Promise<T> =>
    apiClient.put(url, data) as unknown as Promise<T>,
  delete: <T>(url: string): Promise<T> =>
    apiClient.delete(url) as unknown as Promise<T>,
};
