const jwt = require('jsonwebtoken');
const config = require('../config/index');

/**
 * Generate token
 * 
 * @todo: search about async on jwt.sign
 * @todo: try catch???
 */
const generateToken = (user) => {
  const expiration = config.server.env === 'dev' ? '1d' : '7d';
  const token = jwt.sign({
    sub: user._id,
    //iat: Date.now(),
    //exp: expiration,
    email: user.email,
    role: user.role
  }, config.jwt.jwtSecret, {
    expiresIn: expiration,
    algorithm: 'HS256'
  });

  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }

  return null;
};

module.exports = {
  generateToken,
  getToken
};
