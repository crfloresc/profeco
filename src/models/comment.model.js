const mongoose = require('../data/database');

/**
 * Schema for review:
 * - comment: NA
 * - rating: NA
 * - idProduct: NA
 * - idUser: NA
 */
const reviewSchema = new mongoose.Schema({
  comment: {
    type: String
  },
  rating: {
    type: Number,
    required: true
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

// Connection to document reviews
const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
