import axios, { AxiosError } from 'axios';

export function isFetchError(payload: unknown): payload is AxiosError<unknown, unknown> {
  return axios.isAxiosError(payload);
}

export function parseFetchError(error: AxiosError<unknown, unknown>) {
  const { error: message, status } = error.response?.data as { error?: string, status?: number };
  return { status, message };
}