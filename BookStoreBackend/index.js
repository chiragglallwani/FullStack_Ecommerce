const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./Db");
const ProductModel = require("./ModelSchema/ProductModel");
const products = require("./MockData/products.json");
const productRoute = require("./Services/ProductsServices");
const userRoute = require("./Services/UserSevices");
const cartRoute = require("./Services/CartServices");

app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  //"https://book-depot-eta.vercel.app",
  "http://localhost:3000",
];

// app.use(cors({
//     origin: allowedOrigins
// }));
app.use(cors());

db.once("open", async () => {
  try {
    await ProductModel.Product.deleteMany({});
    console.log("All Product data deleted successfully!");
    await ProductModel.Product.insertMany(products["products"]);
    console.log("Product Data inserted successfully!");
  } catch (err) {
    console.log("Error: " + err);
  } finally {
    // db.close();
  }
});

app.use("/products", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log("server running on 3000");
});
