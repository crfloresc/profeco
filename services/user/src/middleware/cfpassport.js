const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

let _opts = {};
_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
_opts.secretOrKey = 'secret';
_opts.algorithms = ['HS256'];

const configLocalStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  await User.findOne({
    email: email
  }).then((user) => {
    if (user === null) {
      return done(null, false);
    } else {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err, false);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
    }
  }).catch((err) => {
    done(err, null);
  });
});

const configJwtStrategy = new JwtStrategy(_opts, async (jwtPayload, done) => {
  try {
    await User.findOne({
      _id: jwtPayload.sub
    }).then((result) => {
      if (result === null) {
        return done(null, false);
      } else {
        return done(null, result);
      }
    }).catch((err) => {
      done(err, null)
    });
  } catch (err) {
    done(err, null);
  }
});

module.exports = {
  configLocalStrategy,
  configJwtStrategy
};
