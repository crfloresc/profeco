const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const User = require('../models/user.model');
const config = require('../config/index');

// https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
// https://techbrij.com/token-authentication-nodejs-express-mongo-passport

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

/*
EXAMPLE
// passport.authenticate('jwt', { session: false})
router.post('/book', (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    newBook.save((err) => {
      if (err) {
        return res.json({success: false, msg: 'Save book failed.'});
      }
      res.json({success: true, msg: 'Successful created new book.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/book', (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
*/
