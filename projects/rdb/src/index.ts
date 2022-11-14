import express from 'express';

import { connectDB } from "./lib/db";
import { notesRouter } from './routes/notes';
import { blogsRouter } from './routes/blogs';

import { PORT } from './utils/config'; 

const app = express();
app.use(express.json());
app.use('/api/notes', notesRouter);
app.use('/api/blogs', blogsRouter);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  await connectDB();
});
