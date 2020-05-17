const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 100,
    unique: true,
    dropDups: true,
    required: true
  },
  rol: {
    type: String,
    maxlength: 100,
    required: true
  },
  password: {
    type: String,
    maxlength: 100, // Hash pass === 60 len
    required: true
  }
});

/**
 * UserSchema pre save
 * 
 * @todo: () => {} is not a object
 */
UserSchema.pre('save', function (next) {
  let user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const user = mongoose.model('users', UserSchema);

module.exports = user;
