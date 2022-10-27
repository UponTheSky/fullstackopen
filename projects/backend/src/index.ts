import dotenv from 'dotenv';
dotenv.config(); // first, run dotenv.config() for making envvars available for all modules globally

import express, { ErrorRequestHandler, Request, RequestHandler, RequestParamHandler, Response } from 'express';
import morgan from 'morgan';

import { PersonModel, DBPersonType } from './person';

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
app.get('/info', async (_, response, next) => {
  try {
    const persons = await PersonModel.find({});
    const message = `
      Phonebook has info for ${persons.length} people\n
      ${String(new Date())}
    `
    response.send(message);

  } catch(error) {
    console.log(`fetching data has failed: ${error}`);
    next(error);
  }
});

app.get('/api/persons', async (_, response: Response<DBPersonType[]>, next) => {
  try {
    const persons = await PersonModel.find({});
    response.json(persons);
  } catch(error) {
    console.log(`fetching data has failed: ${error}`);
    next(error);
  }
}); 

app.get('/api/persons/:id', async (request, response: Response<DBPersonType | string>, next) => {
  try {
    const id = request.params.id;
    const fetchedPerson = await PersonModel.findById(id);
    if (fetchedPerson) {
      response.json(fetchedPerson);
    } else {
      response.status(404).send(`could not find the data matching the id: ${id}`);
    }
  } catch(error) {
    console.log(`fetching data has failed`);
    next(error);
  }
});

app.post('/api/persons', async (
  request: Request<{}, {}, DBPersonType>, 
  response: Response<DBPersonType | { error: string }>,
  next) => {
  try {
    const body = request.body;

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
    next(error);
  }
});

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    await PersonModel.findByIdAndRemove(id);
    response.status(204).end();
  } catch(error) {
    console.log('fetching data has failed');
    next(error);
  }
}); 

app.put('/api/persons/:id', async (request, response: Response<DBPersonType | string | { error: string }>, next) => {
  try {
    const id = request.params.id;
    const body = request.body;

    const personAlready = await PersonModel.find({ name: body.name });
    if (personAlready.length === 0) {
      response.status(400).json({
        error: 'You can only update a value already in the DB'
      });
      return;
    }

    const updatedPerson = await PersonModel.findByIdAndUpdate(
      id, 
      {
        name: body.name,
        number: body.number
      },
      { 
        new: true,
        runValidators: true,
        context: 'query'
      } 
    );
    
    if (updatedPerson) {
      response.json(updatedPerson);
    } else{
      response.status(404).send(`no corresponding person with id: ${id}`);
    }
  } catch(error) {
    console.log('updating data has failed');
    next(error);
  }
});


// error handling middlewares
const handleUnknownEndpoint: RequestHandler = (request, response) => {
  response.status(404).send({
    error: 'unknown point'
  });
};
app.use(handleUnknownEndpoint);

const handleErrorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'malformatted id'
    });
    return;
  }

  if (error.name === 'ValidationError') {
    response.status(400).send({
      error: error.message
    });
    return;
  }

  next(error);
};
app.use(handleErrorMiddleware);

// start the app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server running on port ${PORT}`)
});
