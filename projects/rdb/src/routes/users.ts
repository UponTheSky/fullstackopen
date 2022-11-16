import { Router, RequestHandler } from 'express';
import { Includeable } from 'sequelize';

import { Blog, ReadingList, User } from '../models';
import { tokenExtractor } from '../lib/jwt';

const isAdmin: RequestHandler = async (request, response, next) => {
  const decodedToken = tokenExtractor(request);

  if (decodedToken) {
    const user = await User.findByPk(decodedToken.id);
    if (!user || !user.get('admin')) {
      response.status(401).json({
        error: 'operation not allowed'
      });
      return;
    }

    next();
  }
}

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
    const { read } = request.query;

    const readingListOption: Includeable = {
      model: Blog,
      as: 'blog_listed',
      attributes: ['read', 'id'],
      through: {
        attributes: []
      },
    };

    if (read) {
      readingListOption.where = { read } 
    };

    const user = await User.findByPk(request.params.id, {
      attributes: { exclude: [''] },
      include: [
        {
          model: Blog,
          attributes: { exclude: [''] }
        },
        readingListOption
      ]
    });

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

usersRouter.put('/:username', isAdmin, async (request, response, next) => {
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
    user.set('disabled', request.body.disabled);
    const updatedUser = await user.save();

    response.json(updatedUser);
  } catch (error) {
    next(error);
  }
});
