import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Shop from "./pages/allbooks/shop";

// import { Shop } from "./pages/shop/shop";
import { Login } from "./pages/login/login";
import About from "./pages/about/about";
import Cart from "./pages/cart/cart";
import { SignUp } from "./pages/signup/signup";
import ProductDetails from "./pages/ProductDetails/productDetails";
// import { Checkout } from "./pages/checkout/checkout"
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
