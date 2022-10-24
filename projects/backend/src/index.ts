import express, { Request, Response } from 'express';

import { NoteType } from './types';

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
];

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id))
  : 0;
  
  return maxId + 1;
}

app.get('/', (request, response: Response<string>) => {
  response.send('<h1>Helloooo</h1>');
});

app.get('/api/notes', (request, response: Response<NoteType[]>) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response: Response<NoteType>) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === Number(id));
  note 
  ? response.json(note)
  : response.status(404).end();
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

app.post('/api/notes/', (request: Request<{}, {}, NoteType>, response) => {
  if (!request.body.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = {
    content: request.body.content,
    important: request.body.important || false,
    date: String(new Date()),
    id: generateId()
  }
  notes = [...notes, note];

  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
