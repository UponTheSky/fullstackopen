import { User } from "../models/user";

export const initialBlogs = [
  {
    title: 'test',
    author: 'tester',
    url: 'http://www.test.com',
    likes: 10,
  },
  {
    title: 'test2',
    author: 'tester',
    url: 'http://www.test2.com',
    likes: 2,
  },
  {
    title: 'test3',
    author: "Robert C. Martin",
    url: 'http://www.test3.com',
    likes: 3,
  },
  {
    title: 'test4',
    author: "Robert C. Martin",
    url: 'http://www.test4.com',
    likes: 1,
  },
  {
    title: 'test5',
    author: "Robert C. Martin",
    url: 'http://www.test5.com',
    likes: 3,
  },
];

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
}
