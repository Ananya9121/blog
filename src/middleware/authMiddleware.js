const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return errorHandler.unauthorized(res, 'Token not provided');
  }

  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) {
     
        return errorHandler.unauthorized(res, 'Invalid token');
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authenticate,
};
