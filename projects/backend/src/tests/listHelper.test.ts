import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from '../utils/listHelper';

test('dummy returns one', () => {
  const result = dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '1',
      title: 'test',
      author: 'tester',
      url: 'http://www.test.com',
      likes: 10,
      __v: 0
    },

    {
      _id: '2',
      title: 'test2',
      author: 'tester',
      url: 'http://www.test2.com',
      likes: 2,
      __v: 0
    },
    {
      _id: '3',
      title: 'test3',
      author: "Robert C. Martin",
      url: 'http://www.test3.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '4',
      title: 'test4',
      author: "Robert C. Martin",
      url: 'http://www.test4.com',
      likes: 1,
      __v: 0
    },
    {
      _id: '5',
      title: 'test5',
      author: "Robert C. Martin",
      url: 'http://www.test5.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '6',
      title: 'test6',
      author: "Edsger W. Dijkstra",
      url: 'http://www.test6.com',
      likes: 9,
      __v: 0
    },
    {
      _id: '7',
      title: 'test7',
      author: "Edsger W. Dijkstra",
      url: 'http://www.test7.com',
      likes: 3,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = favoriteBlog(listWithBlogs);
    expect(result).toEqual(listWithBlogs[1]);
  });

  test('most blogs', () => {
    const result = mostBlogs(listWithBlogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 3 });
  });

  test('most likes', () => {
    const result = mostLikes(listWithBlogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  })
});

