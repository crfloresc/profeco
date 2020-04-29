const mongoose = require('../data/database');

/**
 * Schema for product:
 * - barcode: NA
 * - name: NA
 * - description: NA
 * - img: NA
 * - stock: NA
 * - supplier: NA
 * - available: NA
 */
const productSchema = new mongoose.Schema({
  barcode: {
    type: String,
    maxlength: 25,
    required: true
  },
  name: {
    type: String,
    maxlength: 100,
    required: true
  },
  description: {
    type: String,
    maxlength: 255
  },
  img: {
    type: String,
    maxlength: 100
  },
  stock: {
    type: Number,
    min: 1,
    max: 100000,
    required: true
  },
  supplier: {
    type: String,
    maxlength: 100
  },
  available: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

// Connection to document products
const Product = mongoose.model('products', productSchema);

module.exports = Product;
