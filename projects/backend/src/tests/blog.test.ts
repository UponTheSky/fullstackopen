import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { app } from '../app';
import { blogModel } from '../models/blog';
import { User } from '../models/user';
import { initialBlogs } from './helper';

const api = supertest(app);
const username = 'root';
const password = 'secret';

let validId: string;
let token: string;

beforeEach(async () => {
  await blogModel.deleteMany({});
  const blogObjects = initialBlogs.map(blog => new blogModel(blog));
  await Promise.all(blogObjects.map(blog => blog.save()));

  const blogs = await blogModel.find({});
  validId = blogs[0].id;

  // enroll a new user
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({ 
    username: 'root',
    passwordHash
  });

  await user.save();

  // get the token
  const response = await api
    .post('/api/login')
    .send({ username, password });

  token = response.body.token;
});

describe('testing get requests', () => {
  test('/', async () => {
    const response = await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(initialBlogs.length);

    expect(response.body[0].id).toBeDefined();
  }, 100000);
});

describe('testing post requests', () => {
  test('if invalid token is provided', async () => {
    await api
      .post('/api/blog')
      .set({ Authorization: 'Bearer fake token' })
      .send({
        title: 'test7',
        author: "Edsger W. Dijkstra",
        url: 'http://www.test7.com',
        likes: 0, 
      })
      .expect(401);
  });


  test('/', async () => {
    await api
      .post('/api/blog')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'test6',
        author: "Edsger W. Dijkstra",
        url: 'http://www.test6.com',
        likes: 9,
      })
      .expect(201)

    const response = await api.get('/api/blog');

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    
    const body: { title: string }[] = response.body;
    const titles = body.map(blog => blog.title);
    expect(titles).toContain('test6');
  }, 100000);

  test('default likes is 0', async () => {
    await api
      .post('/api/blog')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'test7',
        author: "Edsger W. Dijkstra",
        url: 'http://www.test7.com',
      });

    const response = await api.get('/api/blog');
    const body: { title: string, likes: number }[] = response.body;
    const currTestData = body.filter(blog => blog.title === 'test7')[0];
    expect(currTestData.likes).toBeDefined();
    expect(currTestData.likes).toBe(0);

  }, 100000);

  test('title missing', async () => {
    await api
      .post('/api/blog')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        author: "Edsger W. Dijkstra",
        url: 'http://www.test8.com',
      })
      .expect(400);
  }, 100000);

  test('url missing', async () => {
    await api
      .post('/api/blog')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'test8',
        author: "Edsger W. Dijkstra",
      })
      .expect(400);
  }, 100000);
});

describe('testing put requests', () => {
  test('/', async () => {
    const postResponse = await api
    .post('/api/blog')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      title: 'test9',
      author: "Edsger W. Dijkstra",
      url: 'http://www.test9.com',
      likes: 9,
    });

    const response = await api
      .put(`/api/blog/${postResponse.body.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        likes: 20
      })

    expect(response.body.likes).toEqual(20);
  }, 100000);

  test('if not available id is passed onto', async () => {
    const response = await api
      .put('/api/blog/1')
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
  }, 100000);
});

describe('testing delete requests', () => {
  test('if other(valid though) token is provided', async () => {
    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ 
      username: 'root2',
      passwordHash
    });
  
    await user.save();
  
    // get the token
    const userResponse = await api
      .post('/api/login')
      .send({ username, password });

    const response = await api
      .delete(`/api/blog/${validId}`)
      .set({ Authorization: `Bearer ${userResponse.body.token}` })
      .expect(403)
      
    expect(response.body.error).toBe('not the owner of the blog');
  })

  test('/', async () => {
    const response = await api
    .post('/api/blog')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      title: 'test9',
      author: "Edsger W. Dijkstra",
      url: 'http://www.test9.com',
      likes: 9,
    });

    await api
      .delete(`/api/blog/${response.body.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)
  }, 100000);
});

afterAll(() => {
  console.log("connection closed");
  mongoose.connection.close();
});
