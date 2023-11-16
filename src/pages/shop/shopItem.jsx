import React, { useEffect, useState } from "react";
import { Product } from "./product";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./shopitem.css";

export const ShopItem = () => {
  const { shopId } = useParams();
  const [shopData, setShopData] = useState([]);
  const [productData, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://legitcheck.up.railway.app/api/Shop/GetShopById/${shopId}`)
      .then((response) => {
        // Xử lý dữ liệu nhận được từ API
        setShopData(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
      });
  });

  useEffect(() => {
    fetch(
      `https://legitcheck.up.railway.app/api/Product/GetProductByShopId/${shopId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object" && data !== null) {
          setProduct(data); // Không cần chuyển đổi đối tượng thành mảng
        } else {
          console.log("Dữ liệu trả về không phải là một đối tượng.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [shopId]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="wrapper" style={{ width: "100%" }}>
        <div className="img-area">
          <div className="inner-area">
            <img
              src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
              alt=""
            />
          </div>
        </div>
        <div
          className="arrow"
          style={{ marginRight: "1000px" }}
          onClick={handleBack}
        ></div>
        <div className="icon dots">
          <i className="fas fa-ellipsis-v"></i>
        </div>
        <div className="name">{shopData.shopName}</div>
        <div className="about">{shopData.shopEmail}</div>
        <div className="about">{shopData.shopPhone}</div>
      </div>
      <div className="shop">
        <div className="products">
          {productData.map((product) => (
            <div key={product.id}>
              <Product data={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
