import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { SECRET } from '../utils/config';

export const getBearerToken = (request: Request): string | undefined => {
  const authorization = request.header('authorization');
  if (authorization) {
    return authorization.replace(/^Bearer /, '');
  }

  const unAuthorizedError = new Error('token missing');
  unAuthorizedError.name = 'unAuthorizedError';

  throw unAuthorizedError;
}

export const tokenExtractor = (request: Request): JwtPayload | undefined => {
  const tokenFromHeader = getBearerToken(request);
  if (tokenFromHeader) {
    return jwt.verify(tokenFromHeader, SECRET) as JwtPayload;
  }

  const unAuthorizedError = new Error('token invalid');
  unAuthorizedError.name = 'unAuthorizedError';

  throw unAuthorizedError;
}
