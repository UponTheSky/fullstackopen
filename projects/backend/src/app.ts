import express from 'express';

import { blogRouter } from './controllers/blogs';
import { usersRouter } from './controllers/users';
import { loginRouter } from './controllers/login';
import { connectDB } from './utils/db';
import * as middleware from './utils/middleware';
import * as config from './utils/config';

// generate the app
export const app = express();

// enroll controllers(routers) and middlewares
app.use(express.json());
app.use(middleware.handleRouterLoggings)

app.use('/api/blog', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.handleUnknownEndpoint);
app.use(middleware.handleErorrRequest);

// connect to the DB
const url = config.MONGODB_URL;
url && connectDB(url);
