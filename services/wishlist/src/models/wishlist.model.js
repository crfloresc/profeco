const mongoose = require('../data/database');

/**
 * Schema for wishlist:
 * - name: NA
 * - products: NA
 * - idUser: NA
 */
const wishlistSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 150,
    required: true
  },
  products: [{
    type: String,
    unique: true
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
