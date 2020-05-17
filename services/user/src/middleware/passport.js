const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const User = require('../models/user.model');
const config = require('../config/index');


const opts = {
  // fromAuthHeaderAsBearerToken
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.server.secret
};

const validation = async () => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      await User.findOne({
        id: jwtPayload._id
      }).then((user) => {
        if (user) {
          return done(null, user);
        }
        done(null, false);
      }).catch((err) => {
        done(err, false);
      });
    }));
};
