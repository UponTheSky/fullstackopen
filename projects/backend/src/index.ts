import express, { Request, Response, NextFunction  } from 'express';
import mongoose from 'mongoose';

import { NoteType } from './types';

import * as logger from './utils/logger';
import * as config from './utils/config';

import { Note, DBNoteType } from './models/note';
import { notesRouter } from './controllers/notes';

app.listen(config.PORT, async () => {
  logger.info(`Server running on port ${config.PORT}`);
});
