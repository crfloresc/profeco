const jwt = require('jsonwebtoken');
const config = require('../config/index');

/**
 * Generate token
 * 
 * @todo: search about async on jwt.sign
 */
const generateToken = (res, email) => {
  const expiration = config.server.env === 'dev' ? 100 : 604800000;
  const token = jwt.sign({
    email
  }, config.jwt.jwtSecret, {
    expiresIn: config.env === 'dev' ? '1d' : '7d' // '30m'
  });

  return res.json(token).status(200);
};

/**
 * Verify token
 * 
 * @todo: implement next catch when break out on error
 */
const verifyToken = async (req, res, next) => {
  const token = req.token || '';

  try {
    if (!token) {
      // To change to next
      return res.status(401).json('You need to Login')
    }
    // Search about await on jwt.verify
    const decrypt = await jwt.verify(token, config.jwt.jwtSecret);
    
    req.user = {
      id: decrypt.id,
      email: decrypt.email,
      //rol: decrypt.rol
    };

    next();
  } catch (err) {
    // To change to next
    return res.status(500).json(err.toString());
  }
};

const getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  getToken
};
