import { Router } from 'express';
import { Op } from 'sequelize';

import { tokenExtractor } from '../lib/jwt';
import { Blog, User } from '../models';

export const blogsRouter = Router();

blogsRouter.get('/', async (request, response, next) => {
  const where: { [key: string | symbol]: typeof request.query } = {};
  const { search } = request.query;

  if (search) {
    where.title = {
      [Op.substring]: search
    }
    where.author = {
      [Op.substring]: search
    }
  }

  const blogs = await Blog.findAll({
    include: {
      model: User
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  });
  response.json(blogs);

  next();
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const token = tokenExtractor(request);
    const user = await User.findByPk(token?.id);

    if (!user) {
      const notFoundError = new Error('not found error');
      notFoundError.name = 'notFoundError';
      throw notFoundError;
    }

    const newBlog = await Blog.create({
      ...request.body,
      userId: user.get('id'),
    });
    response.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = tokenExtractor(request);
    const user = await User.findByPk(token?.id);

    if (!user) {
      const notFoundError = new Error('user not found');
      notFoundError.name = 'notFoundError';
      throw notFoundError;
    }

    const blog = await Blog.findByPk(request.params.id);
    
    if (!blog) {
      const notFoundError = new Error('blog not found');
      notFoundError.name = 'notFoundError';
      throw notFoundError;
    }

    if (token?.id !== user.get('id')) {
      const unAuthorizedError = new Error('not the owner of the blog');
      unAuthorizedError.name = 'unAuthorizedError';
      throw unAuthorizedError;
    }

    await blog.destroy();
    response.status(204).end();
  } catch (error) {
    next(error);
  } 
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByPk(request.params.id);
    if (!blog) {
      const notFoundError = new Error('data not found');
      notFoundError.name = 'notFoundError';
      throw notFoundError;
    }

    const newLikes = request.body.newLikes || blog.get('likes');
    blog.set('likes', newLikes);
    const savedBlog = await blog.save();

    response.json(savedBlog);
  } catch (error) {
    next(error);
  }  
});
