import { Router } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/user';
import { generateToken } from '../utils/jwt';
import * as logger from '../utils/logger';

export const loginRouter = Router();

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordCorrect = user 
      && user.passwordHash 
      && await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      response.status(401).json({
        error: 'invalid username or password'
      });
      return;
    }

    const token = generateToken({
      username: user.username,
      id: user._id
    });

    response
      .status(201)
      .send({ token, username: user.username, name: user.name });

  } catch(error) {
    logger.info('POST request to login router has failed');
    next(error);
  }
});
