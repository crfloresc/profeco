const mongoose = require('../data/database');

/**
 * Schema for rating:
 * - rating: NA
 */
const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

// Connection to document ratings
const Rating = mongoose.model('ratings', ratingSchema);

module.exports = Rating;
