
import { Request } from 'express';
import type User from '@/src/routes/vultr/users/users.schema';

export interface ExtendedRequest<ParamsDictionary = {}, ResBody = {}, ReqBody = {}, ReqQuery = {}, Locals = {}>
  extends Request<ParamsDictionary, ResBody, ReqBody, ReqQuery, Locals> {
  loggedInUser?: {
    id: User['id'];
  }
}