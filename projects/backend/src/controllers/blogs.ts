import { Router } from 'express';

import { blogModel } from '../models/blog';
import * as logger from '../utils/logger';

export const blogRouter = Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await blogModel.find({});
    response.json(blogs);
  } catch(error) {
    logger.info("fetching data has failed");
    next(error);
  }
});

blogRouter.post('/', async (request, response, next) => {
  try {
    const { title, url, likes } = request.body;
    const author = request.body.author || 'unknown';

    const existingBlog = await blogModel.find({ url });
    if (existingBlog.length > 0) {
      response.status(400).send(`a blog with url: ${url} already exists in the DB`);
      return;
    }

    const newBlog = new blogModel({ title, url, author, likes });
    const savedBlog = await newBlog.save();

    response.status(201).json(savedBlog);
  } catch(error) {
    logger.info("posting a new blog has failed");
    next(error);
  }
})
