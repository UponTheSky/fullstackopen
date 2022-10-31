import mongoose from 'mongoose';

import { NoteType } from '../types';

// define data schema and toJSON method
export type DBNoteType = Omit<NoteType, 'id'>;

const noteSchema = new mongoose.Schema<DBNoteType>({
  content: {
    type: String,
    minlength: 3,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
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
export const Note = mongoose.model<DBNoteType>('Note', noteSchema);
