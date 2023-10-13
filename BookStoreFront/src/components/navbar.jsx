import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

function Navbar() {
  const { cartItems, setSearchString } = useContext(ShopContext);
  const totalItems = Object.values(cartItems).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  const searchProduct = (searchTerm) => {
    setSearchString(searchTerm);
  };

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="navbar">
      {isHome && (
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              size="50"
              className="search-input"
              placeholder="Search Gadgets here.."
              onChange={(e) => {
                console.log("Search input:", e.target.value);
                searchProduct(e.target.value);
              }}
            />
          </label>
        </div>
      )}
      <div className="shopTitle">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/logo.png"}
            alt="Book Store"
            className="logo"
          />
        </Link>

        {/* <h1><a href="/">Book Store</a></h1> */}
      </div>

      <div className="links">
        <Link to="/login"> Login </Link>
        <Link to="/about"> About </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
