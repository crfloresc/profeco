const mongoose = require('../data/database');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true
  },
  email: {
    type: String,
    maxlength: 100,
    unique: true,
    dropDups: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 100, // Hash pass === 60 len
    required: true
  },
  role: {
    type: String,
    maxlength: 100,
    enum: [
      'CONSUMIDOR',
      'MERCADO',
      'ADMIN'
    ],
    default: 'CONSUMIDOR',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  }
});

/**
 * userSchema pre save
 * 
 * @todo: () => {} is not a object
 */
userSchema.pre('save', function (next) {
  let user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt)
        .then((hash) => {
          user.password = hash;
          next();
        })
        .catch((err) => {
          next(err);
        });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password)
    .then((isMatch) => {
      cb(null, isMatch);
    })
    .catch((err) => {
      cb(err);
    });
};

const user = mongoose.model('users', userSchema);

module.exports = user;
