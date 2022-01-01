const BookModel = require('../models/book.model');

const BookService = {
  getAll: result => BookModel.getAll(result),
  getById: (id, result) => BookModel.getById(id, result),
  create: (book, result) => BookModel.insert(book, result),
  delete: (id, result) => BookModel.delete(id, result),
}

module.exports = BookService;