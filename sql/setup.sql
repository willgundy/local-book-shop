-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS authors_to_books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;


CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  publisher VARCHAR,
  released INT NOT NULL
);

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  dob DATE,
  pob VARCHAR,
  name VARCHAR NOT NULL
);

CREATE TABLE authors_to_books (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  book_id BIGINT,
  author_id BIGINT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books (title, publisher, released)
VALUES
  ('To Kill A Mockingbird', '', 1960), 
  ('Moby Dick', '', 1851);

INSERT INTO authors (dob, pob, name)
VALUES
  ('04/28/1926', 'Monroeville, AL', 'Nelle Harper Lee'), 
  ('08/01/1819', 'New York, NY', 'Herman Melville'),
  ('04/28/1926', 'Monroeville, AL', 'Harper Lee (Second one for testing)');

INSERT INTO authors_to_books (book_id, author_id)
VALUES
  (1, 1),
  (1, 3), 
  (2, 2);