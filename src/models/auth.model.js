const db = require('../configs/connect.mysql');

const Account = function (account) {
  this.id = account.id;
  this.username = account.username;
  this.password = account.password;
  this.avatar = account.avatar;
}

Account.login = (username,result) => {
  const sql = 'select * from account where username=?';
  db.query(sql, username, (error, users) => {
    if (error) {
      throw error;
    }
    result(users.length !== 0 ? { ...users[0] } : null);
  })
}

Account.register = (account, result) => {
  db.query(`insert into account (username,password) values ('${account.username}','${account.password}')`, (err, data) => {
    if (err) {
      result({ message: err });
      return;
    }
    result({
      message: 'Dang ky tai khoan thanh cong'
    })
  })
}

module.exports = Account;