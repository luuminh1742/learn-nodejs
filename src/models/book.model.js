const db = require('../configs/connect.mysql');

const Book = function (book) {
  this.id = book.id;
  this.name = book.name;
  this.author = book.author;
}

Book.getAll = result => {
  db.query('select * from book', (err, book) => {
    if (err) {
      result(err)
      return;
    }
    result(book);
  })
}

Book.getById = (id, result) => {
  db.query(`select * from book where id=${id}`, (err, book) => {
    if (err) {
      result(err);
      return;
    }
    result(book.length !== 0 ? book[0] : {})
  })
}

Book.insert = (b, result) => {
  db.query(`insert into book (name,author) values ('${b?.name}','${b?.author}')`, (err, book) => {
    if (err) {
      result(err);
      return;
    }
    result({
      data: {
        id: book.insertId,
        ...b,
      },
      message: 'insert successful'
    })
  })
}

Book.delete = (id, result) => {
  db.query(`delete from book where id=${id}`, (err, book) => {
    if (err) {
      result(err);
      return;
    }
    result({
      message: 'delete successful'
    })
  })
}

module.exports = Book;