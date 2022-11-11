import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../models/user';

export const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = !user || !user.passwordHash
  ? false
  : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    response.status(401).json({
      error: 'invalid username or password'
    });
    return;
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  if (!process.env.SECRET) {
    response.status(500).end();
    return;
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60*60
  });

  response.status(200).send({
    token,
    username: user.username,
    name: user.name
  });
});
