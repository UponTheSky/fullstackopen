import mongoose from 'mongoose';

import { NoteType } from '../types';

// define data schema and toJSON method

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 3,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// define toJSON for modifying fetched data
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    return returnedObject;
  }
})

// export the model
export const Note = mongoose.model('Note', noteSchema);

export type DBNoteType = typeof noteSchema;
