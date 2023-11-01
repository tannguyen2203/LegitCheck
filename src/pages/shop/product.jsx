import React from "react";

export const Product = (props) => {
  const { productName, productPrice, productImage } = props.data;
  return (
    <div className="product">
      <img src={productImage} alt="" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p style={{ color: "red" }}>{productPrice}đ</p>
      </div>
    </div>
  );
};
