import { RequestHandler } from 'express';
import User from '@/src/routes/vultr/users/users.schema';
import { generateAccessToken } from '@/src/lib/auth/auth.utils';
import { authenticate } from './auth.service';
import { isFetchError, parseFetchError } from '@/src/lib/configured-fetch/fetch.utils';

export const loginController: RequestHandler<
  never,
  string | { user: User },
  {
    email: User['email'],
    password: User['password']
  },
  never
> = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send('No email received');
  if (!password) return res.status(400).send('No password received');
  try {
    const authenticatedUser = await authenticate(email, password);
    if (!authenticatedUser) return res.status(401).send('Email or password is incorrect');
    const payload = { id: authenticatedUser.id };
    if (!process.env.ACCESS_TOKEN_COOKIE_NAME) throw new Error('ACCESS_TOKEN_COOKIE_NAME not found in process.env');
    if (!process.env.ACCESS_TOKEN_DURATION) throw new Error('ACCESS_TOKEN_DURATION not found in process.env');
    const accessToken = generateAccessToken(payload);
    res.cookie(
      process.env.ACCESS_TOKEN_COOKIE_NAME,
      accessToken,
      {
        httpOnly: true,
        maxAge: parseInt(process.env.ACCESS_TOKEN_DURATION),
        sameSite: 'none',
        secure: true
      }
    );
    return res.json({
      user: authenticatedUser
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal server error');
  }
};

export const logoutController: RequestHandler<
  never,
  string,
  never,
  never
> = (req, res) => {
  const loggedInUserId = req.loggedInUserId;
  if (!process.env.ACCESS_TOKEN_COOKIE_NAME) throw new Error('ACCESS_TOKEN_COOKIE_NAME not found in process.env');
  if (!process.env.ACCESS_TOKEN_DURATION) throw new Error('ACCESS_TOKEN_DURATION not found in process.env');
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
  delete req.loggedInUserId;
  return res.status(200).send(loggedInUserId ? 'Successfully logged out' : 'No logged in session found');
};