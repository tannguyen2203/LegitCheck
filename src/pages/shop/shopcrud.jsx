import React, { useEffect, useState } from "react";
import { Product } from "./product";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./shopcrud.css";

export const ShopCRUD = () => {
  const [shopId, setShopId] = useState(0);
  const [productData, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedShopId = localStorage.getItem("shopId");
    if (storedShopId) {
      setShopId(parseInt(storedShopId, 10));
    }

    if (shopId) {
      fetchData();
    }
  }, [shopId]);

  console.log(shopId);

  const fetchData = async () => {
    fetch(`https://legitcheck.up.railway.app/api/Product/GetAllProduct`)
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
  };

  const handleUpdate = (productId) => {
    navigate(`/updateProduct/${productId}`);
  };

  const handleDelete = (productId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

    if (confirmed) {
      axios
        .delete(
          `https://legitcheck.up.railway.app/api/Product/DeleteProduct/id?id=${productId}`
        )
        .then((res) => {
          alert("Sản phẩm đã được xóa thành công");
          navigate("/shopcrud");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
        });
    }
  };

  const handleCreate = () => {
    navigate("/createProduct");
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>LegitCheck Shop</h1>
      </div>
      <button className="button-1" role="button" onClick={handleCreate}>
        Tạo sản phẩm
      </button>
      <div className="products">
        {productData.map((product) => (
          <div key={product.id}>
            <Product data={product} />
            <button
              className="addToCartBtn"
              onClick={() => handleUpdate(product.id)}
            >
              Update
            </button>
            <button
              className="addToCartBtn"
              onClick={() => handleDelete(product.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
