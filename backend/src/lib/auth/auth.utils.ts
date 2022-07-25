
import VultrUser from '@/src/schema/vultr/VultrUser';
import jwt from 'jsonwebtoken';

export function generateAccessToken(payload: Pick<VultrUser, 'id'>): string {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET not found in process.env');
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

export function decodeAccessToken(accessToken: string): VultrUser['id'] | undefined {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET not found in process.env');
  const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (typeof payload === 'string') return undefined;
  if (!payload.id) return undefined;
  const loggedInUserId = payload.id;
  return loggedInUserId;
}