import express from 'express';

import { connectDB } from "./lib/db";
import { 
  notesRouter,
  blogsRouter,
  usersRouter,
  loginRouter,
  authorsRouter,
  readingListsRouter,
  logoutRouter
} from './routes';
import { errorHandler } from './utils/middlewares';

import { PORT } from './utils/config'; 

const app = express();
app.use(express.json());
app.use('/api/notes', notesRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListsRouter);
app.use('/api/logout', logoutRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  await connectDB();
});
