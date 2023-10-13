import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import "./cart.css";

export const CartItem = (props) => {
  const { _id, title, price, thumbnail } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={thumbnail} />
      <div className="desc">
        <p>
          <b>{title}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(_id)}> - </button>
          <input
            value={cartItems[_id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
          />
          <button onClick={() => addToCart(_id)}> + </button>
        </div>
      </div>
    </div>
  );
};
