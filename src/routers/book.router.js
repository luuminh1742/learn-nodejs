const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');

router.get('/book/list', BookController.getList);
router.get('/book/:id', BookController.getById);
router.post('/book/create', BookController.create);
router.get('/book/delete/:id', BookController.delete);

module.exports = router;