import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import supertest from 'supertest';

import { app } from '../app';
import { User } from '../models/user';

import { usersInDb } from './helper';

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ 
      username: 'root',
      passwordHash
    });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'root2',
      name: 'root2',
      password: 'secret'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper status code and message, if username already taken', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'secret'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails when username/password is either not given or its length is less than 3', async () => {
    const usersAtStart = await usersInDb();

    const fakeUser = {
      username: 'ro',
      name: 'name',
      password: 'password'
    };

    const result = await api
      .post('/api/users')
      .send(fakeUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must consist of at least three characters');

    const fakeUser2 = {
      username: 'homersimpson',
      name: 'homer simpson',
      password: ''
    };

    const result2 = await api
      .post('/api/users')
      .send(fakeUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result2.body.error).toContain('password must consist of at least three characters')

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

  }); 
});

afterAll(() => {
  console.log("connection closed");
  mongoose.connection.close();
});
