import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import supertest from 'supertest';

import { app } from '../app';
import { User } from '../models/user';

const api = supertest(app);
const username = 'root';
const password = 'secret';

describe('testing token-based authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      passwordHash
    });

    await user.save();
  });

  test('Successful login with token', async () => {
    const response = await api
      .post('/api/login')
      .send({ username, password })
      .expect(201)

    expect(response.body.token).toBeDefined();
  });

  test('When username or password is invalid', async () => {
    await api
      .post('/api/login')
      .send({ username, password: 'fake '})
      .expect(401)

    await api
      .post('/api/login')
      .send({ username: 'fake', password })
      .expect(401)
  });
})

afterAll(() => {
  console.log("connection closed");
  mongoose.connection.close();
});
