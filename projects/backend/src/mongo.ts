import mongoose from 'mongoose';

import { NoteType } from './types';

// setup the url via commandline input(password)
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.nipffif.mongodb.net/?retryWrites=true&w=majority`;

// define data schema and model
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

// define functions for DB operations
const save = async (url: string, note: Partial<NoteType>) => {
  try {
    // connect to the DB
    await mongoose.connect(url);
    console.log("connected");

    // generate a new note to be saved
    const newNote = new Note(note);
    const result = await newNote.save();

    if (result) {
      console.log("note saved");
    }
    await mongoose.connection.close();
  } catch(error) {
    throw Error(`an error occurred: ${error}`);
  }
};

// save(url, {
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// });

const fetch = async (url: string, options: Partial<NoteType>) => {
  try {
    // connect to the DB
    await mongoose.connect(url);
    console.log("connected");

    // fetch notes from the DB
    const fetched = await Note.find(options);
    fetched.forEach(note => console.log(note));

    await mongoose.connection.close();
  } catch(error) {
    throw Error(`an error occurred: ${error}`);
  } 
}  

fetch(url, {});
