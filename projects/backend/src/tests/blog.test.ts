import supertest from 'supertest';
import mongoose from 'mongoose';

import { app } from '../app';
import { blogModel } from '../models/blog';
import { initialBlogs } from './helper';

const api = supertest(app);
let validId: string;
beforeEach(async () => {
  await blogModel.deleteMany({});
  const blogObjects = initialBlogs.map(blog => new blogModel(blog));
  await Promise.all(blogObjects.map(blog => blog.save()));

  const blogs = await blogModel.find({});
  validId = blogs[0].id;
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
  test('/', async () => {
    await api
      .post('/api/blog')
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
      .send({
        author: "Edsger W. Dijkstra",
        url: 'http://www.test8.com',
      })
      .expect(400);
  }, 100000);

  test('url missing', async () => {
    await api
      .post('/api/blog')
      .send({
        title: 'test8',
        author: "Edsger W. Dijkstra",
      })
      .expect(400);
  }, 100000);
});

describe('testing put requests', () => {
  test('/', async () => {
    const response = await api
      .put(`/api/blog/${validId}`)
      .send({
        likes: 20
      })

    expect(response.body.likes).toEqual(20);
  }, 100000);

  test('if not available id is passed onto', async () => {
    const response = await api
      .put('/api/blog/1')
      .expect(400)
  }, 100000);
});

describe('testing delete requests', () => {
  test('/', async () => {
    await api
      .delete(`/api/blog/${validId}`)
      .expect(204)
  }, 100000);
});

afterAll(() => {
  console.log("connection closed");
  mongoose.connection.close();
});
