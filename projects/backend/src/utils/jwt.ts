import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { UserType } from '../models/user';
import { SECRET } from '../utils/config';

export const generateToken = (user: UserType) => {
  if (!SECRET) {
    throw Error('secret key is not defined');
  }

  const token = jwt.sign(user, SECRET);
  return token;
}

export const getTokenFromRequest = (request: Request) => {
  const authHeader = request.header('authorization');
  const bearerToken = authHeader && authHeader.replace(/^Bearer /, '');

  return bearerToken;
}

export const getDecodedToken = (request: Request) => {
  if (!SECRET) {
    throw Error('secret key is not defined');
  }

  const token = getTokenFromRequest(request);
  try {
    return token && jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
