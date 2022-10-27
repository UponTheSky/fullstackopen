import { Router, Response } from 'express';

import { Note, DBNoteType } from '../models/note';
import * as logger from '../utils/logger';

export const notesRouter = Router();

notesRouter.get('/', async (request, response: Response<DBNoteType[]>) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', async (request, response: Response<DBNoteType | { error: string }>) => {
  const id = request.params.id;
  
  try {
    const note = await Note.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch(error) {
    logger.info(`fetching the item with ${id} has failed: ${error}`);
    response.status(500).send({ error: 'malformatted id' });
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const result = await Note.findByIdAndRemove(id);
    response.status(204).end();
  } catch(error) {
    next(error);
  }
});

notesRouter.post('/', async (request, response, next) => {
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
    logger.info(`cannot save the new note`);
    next(error);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
  
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
