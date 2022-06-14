-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS authors_to_books;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
)

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  dob VARCHAR,
  pob VARCHAR,
  name VARCHAR NOT NULL
)

CREATE TABLE authors_to_books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id BIGINT,
  author_id BIGINT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
)

INSERT INTO books (title, released)
VALUES
  ('To Kill A Mockingbird', 1960), 
  ('Moby Dick', 1851);

INSERT INTO authors (dob, pob, name)
VALUES
  ('04/28/1926', 'Monroeville, AL', 'Nelle Harper Lee'), 
  ('08/01/1819', 'New York, NY', 'Herman Melville');

INSERT INTO books (book_id, author_id)
VALUES
  (1, 1), 
  (2, 2);