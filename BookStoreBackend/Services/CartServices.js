const cartRouter = require("express").Router();

let Cart = require("../ModelSchema/CartModel");

//http://localhost:3000/cart/6422c460d386a575c9dad6d8
cartRouter.route("/:id").get(async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    console.log("Cart find", cart);
    const products = cart.products;
    res.status(httpStatus.StatusCodes.OK).json({
      Cart: cart,
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = cartRouter;
