import mongoose from 'mongoose';

import { NoteType } from './types';

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
  }
})

// export the model
export const Note = mongoose.model<DBNoteType>('Note', noteSchema);

// connect to the DB
const connectDB = async (url: string) => {
  try {
    console.log("connecting to the DB...");
    await mongoose.connect(url);
    console.log("connect succeeded");
  } catch(error) {
    throw Error(`connection failed: ${error}`);
  }
}

const url = process.env.MONGODB_URL;
url && connectDB(url);
