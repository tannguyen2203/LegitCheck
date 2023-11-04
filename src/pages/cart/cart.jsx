import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css";

export const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [refreshCount]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7010/api/Cart/GetCartsByUserId?id=1"
      );
      const data = response.data;
      setCartItems(data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(
        `https://localhost:7010/api/Cart/DeleteProduct/id?userId=1&productId=${productId} `
      );
      setRefreshCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrap cf">
      <div className="heading cf">
        <h1>My Cart</h1>
        <a href="./checkout" className="continue">
          Check out
        </a>
      </div>
      <div className="cart">
        <ul className="cartWrap">
          {cartItems.map((item) => (
            <li className="items odd" key={item.id}>
              <div className="infoWrap">
                <div className="cartSection">
                  <img src={item.product.productImage} className="itemImg" />
                  <h3>{item.product.productName}</h3>
                  <p>{item.product.productPrice}đ</p>
                </div>

                <div className="prodTotal cartSection"></div>
                <div className="cartSection removeWrap">
                  <button
                    className="remove"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
