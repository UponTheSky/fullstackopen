import express, { Request, Response, NextFunction  } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { NoteType } from './types';

import { Note, DBNoteType } from './note';

const app = express();
app.use(express.json());

app.get('/api/notes', async (request, response: Response<DBNoteType[]>) => {
  if (!mongoose.STATES) {
    console.error("not connected yet");
    return;
  }

  const notes = await Note.find({});
  response.json(notes);
});

app.get('/api/notes/:id', async (request, response: Response<DBNoteType | { error: string }>) => {
  const id = request.params.id;
  
  try {
    const note = await Note.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch(error) {
    console.log(`fetching the item with ${id} has failed: ${error}`);
    response.status(500).send({ error: 'malformatted id' });
  }
});

app.delete('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const result = await Note.findByIdAndRemove(id);
    response.status(204).end();
  } catch(error) {
    next(error);
  }
});

app.post('/api/notes/', async (request: Request<{}, {}, NoteType>, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  try {
    const savedNote = await note.save();
    response.json(savedNote);
  } catch(error) {
    console.log(`cannot save the new note`);
    next(error);
  }
});

app.put('/api/notes/:id', async (request, response, next) => {
  
  try {
    const body = request.body;

    const note = {
      content: body.content,
      important: body.important
    };

    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id, 
      note, 
      { 
        new: true,
        runValidators: true,
        context: 'query'
      }
    );
    response.json(updatedNote);
  } catch(error) {
    next(error);
  }
});

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({error: 'unknown endpoint'});
  return;
}

app.use(unknownEndpoint);

const errorHandlingMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log(error);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted error '});
    return;
  }

  if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
    return;
  }
  next(error);
}
app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
