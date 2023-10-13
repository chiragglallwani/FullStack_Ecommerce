const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  discountPercentage: {
    type: mongoose.Decimal128,
    required: false,
  },
  rating: {
    type: mongoose.Decimal128,
    required: false,
  },
  stock: {
    type: Number,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
