import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./bookDetails.css";
import { baseURLApp } from "../../http-common";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`${baseURLApp}/products/` + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="details">
      <div className="bookimg">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="description">
        <h2>
          {" "}
          <b>{product.brand}</b> <b>{product.title}</b>{" "}
        </h2>
        <p>
          {" "}
          <b>Price: ${product.price}</b>{" "}
        </p>
        <p>
          {" "}
          <b>Description:</b> {product.description}
        </p>
        <p>
          {" "}
          <b>Category:</b> {product.category} &emsp; | &emsp;
          <b>Rating:</b> {product.rating?.$numberDecimal}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
