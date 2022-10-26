import express, { Request, Response } from 'express';
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

app.get('/api/notes/:id', async (request, response: Response<DBNoteType>) => {
  const id = request.params.id;
  
  try {
    const note = await Note.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(204).end();
    }
  } catch(error) {
    throw Error(`fetching the item with ${id} has failed: ${error}`);
  }
});

// app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter(note => note.id !== id);

//   response.status(204).end();
// });

app.post('/api/notes/', async (request: Request<{}, {}, NoteType>, response) => {
  const body = request.body;
  
  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  try {
    const savedNote = await note.save();
    response.json(savedNote);
  } catch(error) {
    throw Error(`cannot save the new note: ${error}`);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
