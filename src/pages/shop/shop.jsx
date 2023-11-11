import React, { useEffect, useState } from "react";
import { Product } from "./product";
import { useNavigate } from "react-router-dom";
import "./shop.css";

export const Shop = () => {
  const [productData, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://legitcheck.up.railway.app/api/Product/GetAllProduct")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>LegitCheck Shop</h1>
      </div>
      <div className="products">
        {productData.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product.id)}>
            <Product data={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
