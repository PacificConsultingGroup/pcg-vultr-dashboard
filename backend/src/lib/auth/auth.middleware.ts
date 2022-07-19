import { RequestHandler } from 'express';
import { decodeAccessToken } from './auth.utils';

export const deserializeUser: RequestHandler = (req, res, next) => {
  delete req.loggedInUserId;
  if (!process.env.ACCESS_TOKEN_COOKIE_NAME) throw new Error('ACCESS_TOKEN_COOKIE_NAME not found in process.env');
  const accessToken = req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];
  if (!accessToken) return next();
  try {
    const loggedInUserId = decodeAccessToken(accessToken);
    req.loggedInUserId = loggedInUserId;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send('Access token verification failed');
  }
};

export const requireLoggedInUser: RequestHandler = (req, res, next) => {
  if (req.loggedInUserId) return next();
  if (!process.env.ACCESS_TOKEN_COOKIE_NAME) throw new Error('ACCESS_TOKEN_COOKIE_NAME not found in process.env');
  res.cookie(
    process.env.ACCESS_TOKEN_COOKIE_NAME,
    undefined,
    {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'none',
      secure: true
    }
  );
  return res.status(403).send('Unauthorized access');
};