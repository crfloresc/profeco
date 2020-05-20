const passport = require('passport');
const User = require('../models/user.model');
const { generateToken } = require('../helpers/tokens');
const { info, error } = require('../helpers/logger');

const findAllUsers = async (req, res, next) => {
  try {
    await User.find()
      .exec()
      .then((users) => {
        if (!users) {
          res.statusCode = 404;
          return next();
        }
        res.result = users;
        next();
      }).catch((err) => {
        throw err;
      });
  } catch (err) {
    res.error = err;
    next();
  }
};

/**
 * API: POST Register new user
 * 
 * @todo: search better implementation on check if exist user
 */
const register = async (req, res, next) => {
  const {
    name, email,
    role, password
  } = req.body;

  try {
    const user = new User({
      name: name,
      email: email,
      role: role,
      password: password
    });

    await user.save()
      .then((user) => {
        res.result = user;
        next();
      }).catch((err) => {
        err.status = 404;
        throw err;
      });
  } catch (err) {
    res.error = err;
    next();
  }
};

/**
 * API: GET Log-in user
 * 
 * @todo: implement next catch
 * @todo: dont send the user, implement on client a decrypt token system
 */
const login = async (req, res, next) => {
  try {
    passport.authenticate('local', {
      session: false
    }, (error, user) => {
      if (error) {
        res.statusCode = 400;
        return next();
      }

      if (!user) {
        res.statusCode = 404;
        return next();
      }

      const token = generateToken(user);
      res.result = {
        user: user,
        token: token
      };
      next();
    })(req, res, next);
  } catch (err) {
    res.error = err;
    next();
  }
};

module.exports = {
  findAllUsers,
  login,
  register
};
