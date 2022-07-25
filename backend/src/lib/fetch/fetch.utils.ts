import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export function createFetchClient(config?: AxiosRequestConfig) {
  return axios.create(config);
}

export function isFetchError(payload: unknown): payload is AxiosError<unknown, unknown> {
  return axios.isAxiosError(payload);
}

export function parseFetchError(error: AxiosError<unknown, unknown>) {
  const { error: message, status } = error.response?.data as { error?: string, status?: number };
  return { status, message };
}