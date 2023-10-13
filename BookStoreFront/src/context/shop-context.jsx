import React, { createContext, useState, useEffect } from "react";
import productservices from "../services/productservices";
import { baseURLApp, axios_obj } from "../http-common";

export const ShopContext = createContext(null);
export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [onSaleProducts, setOnSaleProducts] = useState([]);

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      const fetchProductsList = async () => {
        await axios_obj
          .get(`${baseURLApp}/products/`)
          .then((res) => {
            setOriginalProducts(res.data);
            setProducts(res.data);
          })
          .catch((error) => console.log(error));
      };
      fetchProductsList();
    }

    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    if (searchString != "") {
      //API SEARCH
      console.log(searchString);

      productservices
        .searchProduct(searchString)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      setProducts(originalProducts);
    }
  }, [searchString]);

  useEffect(() => {
    fetch(`${baseURLApp}/products/onsale`)
      .then((response) => response.json())
      .then((data) => {
        setOnSaleProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [cartItems, setCartItems] = useState({});

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((b) => b._id === item);
      if (itemInfo) {
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    console.log(totalAmount);
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId]) {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      } else {
        return { ...prev, [itemId]: 1 };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: removedItem, ...updatedItems } = prev;
        return updatedItems;
      }
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems({});
  };

  const contextValue = {
    setSearchString,
    setUser,
    user,
    searchString,
    cartItems,
    products,
    onSaleProducts,
    setCartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
