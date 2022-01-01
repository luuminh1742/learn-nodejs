const JWT = require('../configs/jwt');
const AuthModel = require('../models/auth.model');
var passwordHash = require('password-hash');

const AuthService = {
  register: (account, result) => {
    let error = '';
    if (account?.username === '') {
      error = 'Loi khong co ten dang nhap';
    }
    if (account?.password === '') {
      error += ' - Khong co mat khau';
    }
    if (account?.password !== account?.confirmPassword) {
      error += ' - Xac nhan mat khau khong trung khop';
    }
    if (error !== '') {
      result({ message: error });
      return;
    }
    account.password = passwordHash.generate(account?.password);
    AuthModel.register(account, result)
  },
  login: (account, result) => {
    let error = '';
    if (account?.username === '') {
      error = 'Loi khong co ten dang nhap';
    }
    if (account?.password === '') {
      error += ' - Khong co mat khau';
    }
    if (error !== '') {
      result({ message: error });
      return;
    }
    try {
      AuthModel.login(account.username, async user => {
        if (user === null) {
          result({
            message: "Tai khoan khong ton tai"
          });
        }
        else if (passwordHash.verify(account.password, user?.password)) {
          try {
            const token = await JWT.make(account);
            result({
              user: {
                ...user,
                password: null
              },
              message: 'Dang nhap thanh cong',
              id_token: token
            });
          } catch (err) {
            result({
              message: err.message
            });
          }
        } else {
          result({
            message: "Mat khau sai"
          });
        }
      });
    } catch (error) {
      result({
        message: error.message
      });
    }
  }
}

module.exports = AuthService;