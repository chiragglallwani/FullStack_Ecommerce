const productRouter = require("express").Router();
const db = require("../Db");
const ProductModel = require("../ModelSchema/ProductModel");

//http://localhost:3000/products/
productRouter.route("/").get((req, res) => {
  ProductModel.Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Custom Error: " + err));
});

//http://localhost:3000/products/onsale
productRouter.route("/onsale").get((req, res) => {
  ProductModel.Product.find({ discountPercentage: { $gt: 10 } })
    .limit(20)
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

//http://localhost:3000/products/6422c460d386a575c9dad6d8
productRouter.route("/:id").get((req, res) => {
  ProductModel.Product.findById(req.params.id)
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

//http://localhost:3000/products/title/The%20Great%20Gatsby
productRouter.route("/title/:title").get((req, res) => {
  const searchTitle = req.params.title;
  const regex = new RegExp(searchTitle, "i");
  ProductModel.Product.find({ title: regex })
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = productRouter;
