const mongoose = require('../data/database');

/**
 * Schema for review:
 * - comment: indica el comentario que se va a realizar
 *    de tal producto.
 * - rating: indica las estrellas del 1 al 5 que se van
 *    a dejar al producto, siendo 5 como excelente.
 * - idProduct: indica el id del producto relacionado
 *    a tal comentario.
 * - idUser: indica el id del usuario que realizo
 *    la review relacionado a tal comentario.
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
