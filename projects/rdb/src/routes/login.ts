import jwt from 'jsonwebtoken';
import { Router } from 'express';

import { SECRET } from '../utils/config';
import { User } from '../models';

export const loginRouter = Router();

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ where: { username } });
    const passwordCorrect = password === 'secret';

    if (!user || !passwordCorrect) {
      const unAuthorizedError = new Error('invalid username or password');
      unAuthorizedError.name = 'unAuthorizedError';
      throw unAuthorizedError;
    }

    const userForToken = { username: user.get('username'), id: user.get('id') };
    const token = jwt.sign(userForToken, SECRET);

    response.json({
      token, username: user.get('username'), name: user.get('name')
    });
  } catch (error) {
    next(error);
  }
});
