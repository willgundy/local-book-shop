const { Router } = require('express');
const Author = require('../models/Author');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const singleBook = await Book.getBookById(id);
    res.json(singleBook);
  })

  .get('/', async (req, res) => {
      const bookList = await Book.getAll();
      res.json(bookList);
  })
  
  .post('/', async(req, res, next) => {
    try {
      const newBook = await Book.insert(req.body);
      if(req.body.authorIds) {
        await Promise.all(req.body.authorIds.map((id) => newBook.addAuthorForBook(id)));
      }
      if(req.body.newAuthor) {
        const newAuthor = await Author.insert(req.body.newAuthor);
        await newBook.addAuthorForBook(newAuthor.id);
      }
      res.json(newBook);
    } catch (e) {
      next(e);
    }
  });
