import dotenv from 'dotenv';
dotenv.config(); // first, run dotenv.config() for making envvars available for all modules globally

import express, { Request, Response } from 'express';
import morgan from 'morgan';

import { PersonType } from './types';
import { PersonModel, DBPersonType } from './person';
import mongoose from 'mongoose';

// create an app & middlewares
const app = express();
app.use(express.json()); // for parsing incoming request.body data
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-', 
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ');
}));

// routers
app.get('/info', async (_, response) => {
  try {
    const persons = await PersonModel.find({});
    const message = `
      Phonebook has info for ${persons.length} people\n
      ${String(new Date())}
    `
    response.send(message);

  } catch(error) {
    console.log(`fetching data has failed: ${error}`);
  }
});

app.get('/api/persons', async (_, response: Response<DBPersonType[]>) => {
  try {
    const persons = await PersonModel.find({});
    response.json(persons);
  } catch(error) {
    console.log(`fetching data has failed: ${error}`);
  }
}); 

app.get('/api/persons/:id', async (request, response: Response<DBPersonType | string>) => {
  try {
    const id = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      response.status(400).send(`id: ${id} is not a valid format for _id field in the mongoDB`);
      return;
    }

    const fetchedPerson = await PersonModel.findById(id);
    if (fetchedPerson) {
      response.json(fetchedPerson);
    } else {
      response.send(`could not find the data matching the id: ${id}`);
    }
  } catch(error) {
    console.log(`fetching data has failed: ${error}`);
  }
});

app.post('/api/persons', async (
  request: Request<{}, {}, DBPersonType>, 
  response: Response<DBPersonType | { error: string }>) => {
  try {
    const body = request.body;

    if (!body.name || !body.number) {
      response.status(400).json({
        error: 'content missing',
      });
      return;
    }

    const personAlready = await PersonModel.find({ name: body.name });
    if (personAlready.length > 0) {
      response.status(400).json({
        error: 'name must be unique'
      });
      return;
    }

    const newPerson = new PersonModel({
      name: body.name,
      number: body.number,
    });
    const savedPerson = await newPerson.save();
    response.json(savedPerson);

  } catch(error) {
    console.log(`fetching data has failed: ${error}`);
  }
});

app.delete('/api/persons/:id', async (request, response) => {
  try {
    // const id = request.params.id;
    // PersonModel.deleteOne
    // response.status(204).end();

  } catch(error) {
    console.log(`fetching data has failed: ${error}`);
  }
}); 

// start the app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server running on port ${PORT}`)
});
