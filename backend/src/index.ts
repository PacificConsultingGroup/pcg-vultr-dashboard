
import 'dotenv/config';

import express from 'express';

import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import vultrRouter from '@/src/routes/vultr/vultr.router';
import apiRouter from '@/src/routes/api/api.router';
import { deserializeUser, requireLoggedInUser } from './lib/auth/auth.middleware';

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({
  credentials: true,
  origin: process.env.NODE_ENV === (
    'development'
      ? 'http://localhost:3000'
      : `https://${process.env.FRONTEND_AUTHORITY}`
  )
}));
app.use(cookieParser());
app.use(express.json());

app.use(deserializeUser);

app.use('/api', apiRouter);
app.use('/vultr/', requireLoggedInUser, vultrRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));