const mongoose = require('../data/database');

/**
 * Schema for wishlist:
 * - products: NA
 * - idUser: NA
 */
const wishlistSchema = new mongoose.Schema({
  products: [{
    type: String,
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

// Connection to document wishlists
const Wishlist = mongoose.model('wishlists', wishlistSchema);

module.exports = Wishlist;
