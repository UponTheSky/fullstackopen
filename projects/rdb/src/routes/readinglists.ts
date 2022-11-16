import { Router } from 'express';
import { tokenExtractor } from '../lib/jwt';
import { Blog } from '../models';

import { ReadingList } from '../models/readinglist';

export const readingListsRouter = Router();

readingListsRouter.post('/', async (request, response, next) => {
  try {
    const { blogId, userId } = request.body;

    if (!blogId || !userId) {
      throw new Error('invalid input');
    }

    const newReadingList = await ReadingList.create({ blogId, userId });    
    response.status(201).json(newReadingList);
  } catch(error) {
    next(error);
  }
});

readingListsRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const blogId = request.body.blogId;
    const decodedToken = tokenExtractor(request);

    if (!id || !blogId || !decodedToken) {
      throw new Error('either id or blog id or token has not been provided');
    }

    const readBlogList = await Blog.findByPk(id);

    if (!readBlogList) {
      throw new Error('404 not found');
    }

    if (readBlogList.get('blog_id') !== blogId || readBlogList.get('user_id') !== decodedToken.id) {
      throw new Error('403 forbidden');
    }

    readBlogList.set('read', true);

  } catch(error) {
    next(error);
  }
});
