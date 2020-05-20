const mongoose = require('../data/database');

/**
 * Schema for preference:
 * - productWanted: NA
 * - favSupermarket: NA
 * - idUser: NA
 * lista de us supermercado
 */
const preferenceSchema = new mongoose.Schema({
  productWanted: [{
    type: String
  }],
  favSupermarket: [{
    type: String
  }],
  idUser: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

// Connection to document preferences
const Preference = mongoose.model('preferences', preferenceSchema);

module.exports = Preference;
