import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import cartservices from "../../services/cartservices";

export const Product = (props) => {
  const { _id, title, price, thumbnail } = props.data;
  const { addToCart, cartItems, user } = useContext(ShopContext);
  const cartItemCount = cartItems[_id];

  const addToCartAction = (id) => {
    if (user !== null) {
      console.log("user logged In");
      const userID = user._id;

      const addToCartRequest = {
        userId: userID,
        productId: id,
      };

      cartservices
        .addToCart(addToCartRequest)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
    addToCart(id);
  };

  return (
    <div className="product">
      <Link to={`/productDetails/${_id}`}>
        <img src={thumbnail} alt={title} />
      </Link>
      <div className="description">
        <Link to={`/productDetails/${_id}`}>
          <b>{title}</b>
        </Link>
        <br />${price}
      </div>
      <button className="addToCartBttn" onClick={() => addToCartAction(_id)}>
        {" "}
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
