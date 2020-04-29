const mongoose = require('../data/database');

// Schema for product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true
  },
  description: {
    type: String,
    maxlength: 100
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
  company: {
    type: String,
    maxlength: 100,
    required: true
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
