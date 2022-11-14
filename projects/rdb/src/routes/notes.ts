import { Router } from 'express';
import { tokenExtractor } from '../lib/jwt';

import { Note, User } from '../models';

export const notesRouter = Router();

notesRouter.get('/', async (_request, response) => {
  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  });
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
    const token = tokenExtractor(request);

    if (token) {
      const user = await User.findByPk(token.id);

      if (!user) {
        const notFoundError = new Error('user not found');
        notFoundError.name = 'notFoundError';
        throw notFoundError;
      }

      const newNote = await Note.create({ 
        ...request.body, 
        userId: user.get('id'), 
        date: new Date() 
      });
      response.status(201).json(newNote);
    }
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
