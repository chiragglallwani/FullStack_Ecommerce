import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import "./featuredbooks.css";

function OnSaleProducts(props) {
  const { _id, title, price, thumbnailUrl } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemCount = cartItems[_id];

  return (
    <div>
      <div className="product">
        <Link to={`/productDetails/${_id}`}>
          <img src={thumbnailUrl} alt={title} />
        </Link>
        <div className="description">
          <p>
            <Link to={`/productDetails/${_id}`}>
              <b>{title}</b>
            </Link>
          </p>
          <p> ${price}</p>
        </div>
        <button className="addToCartBttn" onClick={() => addToCart(_id)}>
          Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </button>
      </div>
    </div>
  );
}

export default OnSaleProducts;
