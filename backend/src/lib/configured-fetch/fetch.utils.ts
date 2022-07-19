import axios, { AxiosError } from 'axios';

export function isFetchError(payload: unknown): payload is AxiosError<unknown, unknown> {
  return axios.isAxiosError(payload);
}