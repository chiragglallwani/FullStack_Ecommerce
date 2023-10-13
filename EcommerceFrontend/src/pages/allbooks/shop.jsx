import React, { useContext, useEffect, useState } from "react";
import { Product } from "./product";
import { ShopContext } from "../../context/shop-context";
import Label from "./label";

import "./shop.css";

function Shop() {
  const { products, onSaleProducts } = useContext(ShopContext);
  const [selectedValue, setSelectedValue] = useState("Products");

  const renderProducts = (selectedValue) => {
    const searchBar = document.querySelector("#search-form");
    if (searchBar !== null) {
      searchBar.style.display = "none";
    }

    switch (selectedValue) {
      case "on-sale":
        return (
          <>
            <Label title="Featured Books" />
            <div className="products">
              {onSaleProducts.map((product) => (
                <Product key={product._id} data={product} />
              ))}
            </div>
          </>
        );
      case "Products":
        if (searchBar !== null) {
          searchBar.style.display = "block";
        }
        return (
          <>
            <Label title="All Books" />
            <div className="products">
              {products.map((product) => (
                <Product key={product._id} data={product} />
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="option">
      <select
        className="bookOptions"
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="Products">All Products</option>
        <option value="on-sale">On Sale</option>
      </select>
      {renderProducts(selectedValue)}
    </div>
  );
}

export default Shop;
