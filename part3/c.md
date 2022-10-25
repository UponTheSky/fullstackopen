# Saving data to MongoDB

## Debugging Node applications
- skim through this part

## MongoDB
- mongoDB: document DB(NoSQL)
- instead of official mongoDB node.js driver, we'll use mongoose
- **mongoose**?: an object document mapper(ODM)

```js
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
      await mongoose.connection.close();
    }
  } catch(error) {
    throw Error(`an error occurred: ${error}`);
  }
};

save(url, {
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
});
```

## Schema
- **schema**?: tells mongoose how the note objects are to be stored in the DB
- the name of the model(singular, `Note`) automatically translated into lowercase plural(`notes`)
- the idea behind mongoose: the data stored in the DB is given a schema at the level of the application that defines the shape of the documents stored in any given collection

## Creating and saving objects
- **model**?: a constructor functions that create new JS objects based on the provded parameters
- this created object has various functions like saving the data to the DB
- you must close the connection: otherwise the program never ends

## Fetching objects from the database

## Backend connected to a database

## Database configuration into its own module

## Using database in route handlers

## Verifying frontend and backend integration

## Error handling 

## Moving error handling into middleware

## The order of middleware loading

## Other operations
