import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (request: Request, secretKey: string) => {
  const bearerToken = request.header('authorization');

  if (bearerToken) {
    const token = bearerToken.replace(/^Bearer /, '');
    const decodedToken = jwt.verify(token, secretKey);

    if (typeof decodedToken === 'string') {
      return JSON.parse(decodedToken);
    }

    return decodedToken;
  }

  throw Error('no token provided');
}
