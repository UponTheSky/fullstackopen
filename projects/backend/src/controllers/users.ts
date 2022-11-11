import { Router } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/user';
import * as logger from '../utils/logger';

export const usersRouter = Router();

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    // validation check
    if (password.length < 3) {
      response.status(400).json({
        error: 'password must consist of at least three characters'
      })
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      response.status(400).json({
        error: 'username must be unique'
      });
      return;
    }

    // store the user's password as a hashed value
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // create a new user instance
    const user = new User({
      username,
      name,
      passwordHash
    });

    // save to the db
    const savedUser = await user.save();

    // response
    response.status(201).json(savedUser);
  } catch(error) {
    logger.info("creating a new user has failed");
    next(error);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1, id: 1 });
    response.json(users);

  } catch(error) {
    logger.info("fetching all the users has failed");
    next(error);
  }
})