import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productDescription.css";

export const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7010/api/Product/GetProductById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div>
        <img className="left-column" src={product.productImage} alt="" />
      </div>

      <div className="right-column">
        <div className="product-description">
          <h1>{product.productName}</h1>
          <p>{product.productDescription}</p>
        </div>

        <div className="product-price">
          <span style={{ color: "red" }}>{product.productPrice}đ</span>
          <a href="#" className="cart-btn">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};
