
import User from '@/src/routes/vultr/vultr.schema';
import jwt from 'jsonwebtoken';

export function generateAccessToken(payload: Pick<User, 'id'>): string {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET not found in process.env');
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

export function decodeAccessToken(accessToken: string): User['id'] | undefined {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET not found in process.env');
  const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (typeof payload === 'string') return undefined;
  if (!payload.id) return undefined;
  const loggedInUserId = payload.id;
  return loggedInUserId;
}