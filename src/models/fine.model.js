const mongoose = require('../data/database');

/**
 * Schema for fine:
 * - cause: NA
 * - idUser: NA
 */
const fineSchema = new mongoose.Schema({
  cause: {
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

// Connection to document fines
const Fine = mongoose.model('fines', fineSchema);

module.exports = Fine;
