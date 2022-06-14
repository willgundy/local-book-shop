const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const singleAuthor = await Author.getAuthorById(id);
    res.json(singleAuthor);
  })

  .get('/', async (req, res) => {
      const authorList = await Author.getAll();
      res.json(authorList);
  })
    
  .post('/', async(req, res, next) => {
    try {
      const newAuthor = await Author.insert(req.body);
      if(req.body.bookIds) {
        await Promise.all(req.body.bookIds.map((id) => newAuthor.addBookForAuthor(id)));
      }
      res.json(newAuthor);
    } catch (e) {
      next(e);
    }
  });
