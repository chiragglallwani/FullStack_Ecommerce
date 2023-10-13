import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";
import cartservices from "../../services/cartservices";

function Cart() {
  const { cartItems, getTotalCartAmount, products, user, setCartItems } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      console.log("user logged In");
      const userID = user._id;

      cartservices
        .getCartItems(userID)
        .then((response) => {
          var cartResponseproducts = response.data.Cart.products;
          console.log(cartResponseproducts);

          let carItems = {};
          for (const index in cartResponseproducts) {
            const item = cartResponseproducts[index];
            carItems[item.product._id] = item.quantity;
          }
          setCartItems(carItems);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);

  return (
    <div className="cart">
      <div>
        <h2>
          <b>Your Cart Items</b>
        </h2>
      </div>
      <div className="cart">
        {products.map((product) => {
          if (cartItems[product._id]) {
            return <CartItem key={products._id} data={product} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button onClick={() => navigate("/")}> Checkout </button>
        </div>
      ) : (
        <h5 className="empty"> Your Shopping Cart is Empty</h5>
      )}
    </div>
  );
}
export default Cart;
