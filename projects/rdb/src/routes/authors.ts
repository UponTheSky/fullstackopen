import { Router } from 'express';

import { sequelize } from '../lib/db';
import { Blog } from '../models';

export const authorsRouter = Router();

authorsRouter.get('/', async (_request, response) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ]
  })

  response.json(authors);
});
