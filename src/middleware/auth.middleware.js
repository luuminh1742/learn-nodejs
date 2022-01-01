const JWT = require('../configs/jwt');

const isAuth = async (req, res, next) => {
  const _token = req.headers.authorization;
  if (_token) {
    try {
      const authData = await JWT.check(_token);
      req.auth = authData;
      next();
    } catch (err) {
      return res.send({ message: err.message });
    }
  } else {
    return res.send({ message: 'You are not logged in!' });
  }
}

module.exports = { isAuth: isAuth };