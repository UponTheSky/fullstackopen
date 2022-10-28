import _ from 'lodash';

import { BlogType } from '../models/blog';

export const dummy = (blogs: BlogType[]) => 1;

export const totalLikes = (blogs: BlogType[]) => {
  const total = blogs.reduce((prev, curr) => prev + curr.likes, 0);
  return total;
};

export const favoriteBlog = (blogs: BlogType[]) => {
  let maxVal = -1;
  let maxBlog = blogs[0];

  blogs.forEach(blog => {
    if (maxVal < blog.likes) {
      maxBlog = blog;
      maxVal = blog.likes;
    }
  })

  return maxBlog;
}

export const mostBlogs = (blogs: BlogType[]) => {
  const countBlogs = _.countBy(blogs, (blog => blog.author));

  let author = blogs[0].author;
  let maxNum = -1;

  Object.entries(countBlogs).forEach(([key, val]) => {
    if (maxNum < val) {
      maxNum = val;
      author = key;
    }
  });

  return { author, blogs: maxNum };
}

export const mostLikes = (blogs: BlogType[]) => {
  const groupBlogs = _.groupBy(blogs, (blog => blog.author));
  const totalAuthorLikes = Object.entries(groupBlogs).map(([author, authorBlogs]) => ({
    author,
    likes: authorBlogs.reduce((prev, curr) => prev + curr.likes, 0)
  }));

  let maxAuthor = blogs[0].author;
  let maxNum = -1;

  totalAuthorLikes.forEach(({ author, likes}) => {
    if (maxNum < likes) {
      maxNum = likes;
      maxAuthor = author;
    }
  });

  return { author: maxAuthor, likes: maxNum };

}