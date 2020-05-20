const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

let _opts = {};
_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
_opts.secretOrKey = 'secret';
_opts.algorithms = ['HS256'];

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
  configJwtStrategy
};
