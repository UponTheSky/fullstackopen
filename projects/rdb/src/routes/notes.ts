import { Router } from 'express';

import { Note } from '../models/note';

export const notesRouter = Router();

notesRouter.get('/', async (_request, response) => {
  const notes = await Note.findAll();
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findByPk(request.params.id);
  note 
  ? response.json(note)
  : response.status(404).end();
});

notesRouter.post('/', async (request, response) => {
  try {
    const newNote = await Note.create(request.body);
    response.status(201).json(newNote);
  } catch(error) {
    if (error instanceof Error) {
      response.status(400).json({
        error: error.message
      });
    }
  }
});

notesRouter.put('/:id', async (request, response) => {
  const note = await Note.findByPk(request.params.id);
  if (note) {
    note.set('important', request.body.important);
    await note.save();
    response.json(note);
  } else {
    response.status(404).end();
  }
});
