CREATE TABLE blogs (
  id SERIAL PRIMARY KEY, 
  author TEXT, 
  url TEXT NOT NULL, 
  title TEXT NOT NULL, 
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) values ('Dan Abramov', 'https://test1.com', 'On let vs const', 0);
INSERT INTO blogs (author, url, title, likes) values ('Laurenz Albe', 'https://test2.com', 'Gaps in sequences in PostgreSQL', 0);
