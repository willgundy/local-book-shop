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
  });
