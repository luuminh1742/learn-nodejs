const BookService = require('../services/book.service');

exports.getList = (req, res) => {
  BookService.getAll(result => {
    res.send({
      data: result
    });
  });
}

exports.getById = (req, res) => {
  const id = req.params.id;
  BookService.getById(id, result => {
    res.json(result);
  });
}

exports.create = (req, res) => {
  const book = req.body;
  BookService.create(book, result => {
    res.json(result);
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  BookService.delete(id, result => {
    res.json(result);
  });
}
