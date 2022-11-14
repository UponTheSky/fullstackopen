import { Router } from 'express';

import { Blog, User } from '../models';

export const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  });
  response.json(users);

  next();
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const newUser = await User.create(request.body);
    response.json(newUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findByPk(request.params.id);

    if (!user) {
      const notFoundError = new Error('data not found');
      notFoundError.name = 'notFoundError';
      throw notFoundError;
    }

    response.json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.put('/:username', async (request, response, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: request.params.username
      }
    });

    if (!user || !request.body.username) {
      const notFoundError = new Error('data not found');
      notFoundError.name = 'notFoundError';
      throw notFoundError;
    }

    user.set('username', request.body.username);
    const updatedUser = await user.save();

    response.json(updatedUser);
  } catch (error) {
    next(error);
  }
});
