const mongoose = require("mongoose");
const ProductModel = require("./ProductModel");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      product: {
        type: ProductModel.productSchema,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
