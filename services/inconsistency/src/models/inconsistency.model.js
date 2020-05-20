const mongoose = require('../data/database');

/**
 * Schema for inconsistency:
 * - cause: NA
 * - idProduct: NA
 * - idUser: NA
 */
const inconsistencySchema = new mongoose.Schema({
  cause: {
    type: String,
    default: 'El precio publicado difiere del precio real'
  },
  idProduct: {
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

// Connection to document inconsistencies
const Inconsistency = mongoose.model('inconsistencies', inconsistencySchema);

module.exports = Inconsistency;
