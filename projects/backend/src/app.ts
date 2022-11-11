import express from 'express';

import { connectDB } from './models/mongo';
import { notesRouter } from './controllers/notes';
import { usersRouter } from './controllers/users';
import { loginRouter } from './controllers/login';
import * as middleware from './utils/middleware';

import * as logger from './utils/logger';
import * as config from './utils/config';

// connect to the DB
const url = config.MONGODB_URL;
if (url) {
  logger.info('connecting to the DB');
  connectDB(url);
  logger.info('connection has been successful');
} else {
  logger.error('the DB url is not yet specified');
}

// generate app and enroll middlewares
export const app = express();
app.use(express.json());
app.use('/api/notes', notesRouter); // controllers
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint); // error handlers
app.use(middleware.errorHandlingMiddleware);
