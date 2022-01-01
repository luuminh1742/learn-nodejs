
const AuthService = require('../services/auth.service');

exports.login = (req, res) => {
  const user = req.body;
  AuthService.login(user, result => {
    res.send(result);
  })
};

exports.register = (req, res) => {
  const user = req.body;
  AuthService.register(user, result => {
    res.send(result);
  })
}

