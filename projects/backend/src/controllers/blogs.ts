import { Router } from 'express';

import { blogModel } from '../models/blog';
import { User } from '../models/user';
import { getDecodedToken } from '../utils/jwt';
import * as logger from '../utils/logger';

export const blogRouter = Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await blogModel
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 });

    response.json(blogs);
  } catch(error) {
    logger.info("fetching data has failed");
    next(error);
  }
});

blogRouter.post('/', async (request, response, next) => {
  try {
    let { title, url, likes } = request.body;
    const decodedToken = getDecodedToken(request);

    // token validity check
    if (!decodedToken || !(typeof decodedToken === 'object' && decodedToken.id)) {
      response.status(401).json({
        error: 'token missing or invalid'
      });
      return;
    }

    const author = request.body.author || 'unknown';

    if (!likes) {
      likes = 0;
    }

    if (!title || !url) {
      response.status(400).json({
        error: 'either url or title is not defined'
      });
      return;
    }

    const existingBlog = await blogModel.find({ url });
    if (existingBlog.length > 0) {
      response.status(400).json({
        error: `a blog with url: ${url} already exists in the DB`
      });
      return;
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      response.status(400).json({
        error: `no such user with id ${decodedToken.id}`
      });
      return;
    }

    const newBlog = new blogModel({ title, url, author, likes, user: user._id });
    const savedBlog = await newBlog.save();

    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();

    response.status(201).json(savedBlog);
  } catch(error) {
    logger.info("posting a new blog has failed");
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    const { likes } = request.body;

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id, 
      {likes: likes }, 
      { new: true }
    );

    if (updatedBlog) {
      response.json(updatedBlog);
    } {
      response.status(400).send(`updating not successful with ${likes}`);
    }
  } catch(error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    await blogModel.findByIdAndRemove(id);
    response.status(204).end();
      
  } catch(error) {
    next(error);
  }
});
