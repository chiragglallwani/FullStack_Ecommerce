const userRouter = require("express").Router();
const db = require("../Db");
httpStatus = require("http-status-codes");
let ProductModel = require("../ModelSchema/ProductModel");
let User = require("../ModelSchema/UserModel");
let Cart = require("../ModelSchema/CartModel");
const { ObjectId } = require("mongodb");

// REQUEST
// {
//     "email": "vasu",
//     "password": "2123"
// }
userRouter.route("/signup").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const newUser = new User({
    email,
    password,
    firstName,
    lastName,
  });

  try {
    const savedUser = await newUser.save();
    console.log("User Created");

    const email = savedUser.email;
    const userId = savedUser._id;
    const firstName = savedUser.firstName;
    const lastName = savedUser.lastName;

    let cartid = "";

    const newcart = new Cart({
      userId,
    });

    const savedCart = await newcart.save();
    console.log("Cart Created successfully");
    cartid = savedCart._id;

    res.status(httpStatus.StatusCodes.OK).json({
      UserAdded: {
        email: email,
        userId: userId,
        cartId: cartid,
        firstName: firstName,
        lastName: lastName,
      },
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

userRouter.route("/addProduct").post(async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  console.log("productID", productId);
  try {
    const product_m = await ProductModel.Product.findById(
      new ObjectId(productId)
    );
    console.log("product_m", product_m);
    const cart = await Cart.findOne({ userId: userId });
    console.log("Cart findOne", cart);
    if (cart.products == null) {
      console.log("cart is not intialised till now");
      cart.products = [{ product: product_m, quantity: 1 }];
    } else {
      const existingProductIndex = cart.products.findIndex(
        (cartProduct) =>
          cartProduct.product._id.toString() === product_m._id.toString()
      );

      if (existingProductIndex === -1) {
        console.log("No existing product");
        cart.products.push({ product: product_m, quantity: 1 });
      } else {
        console.log("Existing product");
        cart.products[existingProductIndex].quantity += 1;
      }
    }

    const savedCart = await cart.save();
    console.log("product Added");

    res.status(httpStatus.StatusCodes.OK).json({
      Userproducts: {
        userId: userId,
        products: savedCart.products,
      },
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// REQUEST
// {
//     "email": "vasu",
//     "password": "2123"
//
userRouter.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: password })
    .then((user) => {
      if (user !== null) {
        res.json({
          msg: "Logge In Successfull",
          status: httpStatus.StatusCodes.OK,
          user: user,
        });
      } else {
        res
          .status(httpStatus.StatusCodes.UNAUTHORIZED)
          .json("Error: " + "User not found");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = userRouter;
