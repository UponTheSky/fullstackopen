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
- using `<model>.find` method

## Backend connected to a database
- modifying the queried data from the DB

```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

app.get('/api/notes', async (request, response: Response<DBNoteType[]>) => {
  if (!mongoose.STATES) {
    console.error("not connected yet");
    return;
  }

  const notes = await Note.find({});
  response.json(notes);
});
```
- `toJSON`: when the response is sent in the JSON format, this method of each object in the fetched array(`notes`) is called
automatically by the `JSON.stringify` method

## Database configuration into its own module
- refactoring into a separate module
- config via `process.env.<ENV_VAR>` and `dotenv` library
- be aware that you run `dotenv.config()` before importing `Note` model so that our env vars are globally available when those modules begin to run

## Using database in route handlers
- customizing the router handlers according to the mongoose API

## Verifying frontend and backend integration
- skim this part

## Error handling
- status 404(not found) / 500(internel server error) / 400(bad request)
- when dealing with Promises, it is always good to have error handling logics

## Moving error handling into middleware
- in some cases it is better to implement all error handling in a single place
- `next` argument at the handling function: passes the error forward
  - if `next` is called without a parameter, then the execution would simply move onto the next route or middleware
  - otherwise, the execution will continue to the error handler middleware

- express error handlers: middlewares of the form: `(error, request, response, next) => {...}`
- it not returned, error handlers passes the error forward to the default express error handler
- error handling middleware must be the last loaded middleware

## The order of middleware loading
- the execution order of middleware is the same as the order that they are loaded into express with `app.use`
- json parser must be the first to be enrolled
- the middleware for handling unsupported routes: next to the last middleware to be enrolled
  - no routes or middleware(except error handler) will be called after the response has been sent by unknown endpoint middleware

## Other operations
- delete, put
- `findByIdAndUpdate`: need to specify the option `{ new: true }` for getting the updated object