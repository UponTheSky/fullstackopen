import { response, Router } from 'express';

import { Blog } from '../models/blog';

export const blogsRouter = Router();

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  try {
    const newBlog = await Blog.create(request.body);
    response.status(201).json(newBlog);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      response.status(400).json({
        error: 'bad request'
      });
    }
  }
});

blogsRouter.delete('/:id', async (request, responose) => {
  try {
    const blog = await Blog.findByPk(request.params.id);
    if (!blog) {
      response.status(404).end();
      return;
    }

    await blog.destroy();
    response.status(204).end();
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      response.status(400).json({
        error: 'bad request'
      });
    }
  } 
});
