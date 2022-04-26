CREATE TABLE blogs(
  id SERIAL PRIMARY KEY, 
  author text, 
  url text NOT NULL, 
  title text NOT NULL, 
  likes integer DEFAULT 0 
);

insert into blogs (author, url, title) values (‘Ben the dover’, ‘www.google.com’, ‘How to google’);
insert into blogs (author, url, title) values (‘Ben the dover’, ‘www.notgoogle.com’, ‘How to not google’);