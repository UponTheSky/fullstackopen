import mongoose from 'mongoose';
import supertest from 'supertest';

import { app } from '../app';
import { Note } from '../models/note';
import * as helper from './test_helper';

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject;

  for (let note of helper.initialNotes) {
    noteObject = new Note(note);
    await noteObject.save();
  }
}, 100000);

test('notes are returned as json', async () => {
  await api.get('/api/notes').expect(200).expect('Content-Type', /application\/json/);
}, 100000);

test('there are one notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('the special note', async () => {
  const response = await api.get('/api/notes');
  const body: { content: string}[] = response.body;
  const contents = body.map(res=> res.content);

  expect(contents).toContain('Browser can execute only Javascript');
});

test('a valid data can be added', async () => {
  const newNote = {
    content:  'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(helper.initialNotes.length + 1);
});

test('note without content is not added', async () => {
  const newNote = {
    important: true
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);

});

test('a specific note can be viewed', async () => {
  const notesAtstart = await helper.notesInDb();
  const noteToView = notesAtstart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

  expect(resultNote.body).toEqual(processedNoteToView);
});

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);
})

afterAll(() => {
  mongoose.connection.close();
})
