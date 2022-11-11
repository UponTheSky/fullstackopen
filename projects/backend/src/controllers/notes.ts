import { Router, Response } from 'express';

import { Note, DBNoteType } from '../models/note';
import { User } from '../models/user';
import { verifyToken } from '../utils/jwt';
import * as logger from '../utils/logger';

export const notesRouter = Router();

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
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

  try {
    if (!process.env.SECRET) {
      response.status(500).end();
      return;
    }

    const decodedToken = verifyToken(request, process.env.SECRET);
    if (!decodedToken.id) {
      response.status(401).json({
        error: 'token missing or invalid'
      });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      response.status(400).send('no such user exists');
      return;
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
      user: user._id,
    });

    const savedNote = await note.save();
    user.notes = [ ...user?.notes, savedNote._id ];
    await user.save();

    response.status(201).json(savedNote);
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
