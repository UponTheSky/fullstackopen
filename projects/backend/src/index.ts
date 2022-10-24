import express, { Request, Response } from 'express';
import morgan from 'morgan';

import { PersonType } from './types';
import { personsData } from './hardcode_data';

import { generateId } from './utils/generateId';

let persons = personsData;

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
app.get('/info', (_, response) => {
  const message = `
    Phonebook has info for ${persons.length} people\n
    ${String(new Date())}
  `
  response.send(message);
});

app.get('/api/persons', (_, response: Response<PersonType[]>) => {
  response.json(persons);
}); 

app.get('/api/persons/:id', (request, response: Response<PersonType>) => {
  const id = Number(request.params.id);

  const person = persons.find(person => person.id === id) ;
  if (!person) {
    response.status(404).end();
    return;
  }

  response.json(person);
});

app.post('/api/persons', (request: Request<{}, {}, Omit<PersonType, 'id'>>, response: Response<Omit<PersonType, 'id'> | { error: string }>) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: 'content missing',
    });
    return;
  }

  const personAlready = persons.find(person => person.name == body.name);
  if (personAlready) {
    response.status(400).json({
      error: 'name must be unique'
    });
    return;
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = [...persons, newPerson];
  response.json(newPerson);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  console.log(persons);
  response.status(204).end();
}); 

// start the app
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`The server running on port ${PORT}`)
});
