import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./productDescription.css";

export const ProductDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://legitcheck.up.railway.app/api/Product/GetProductById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        localStorage.setItem("shopTempId", data.shopId);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  const handleDelete = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

    if (confirmed) {
      axios
        .delete(
          `https://legitcheck.up.railway.app/api/Product/DeleteProduct/id?id=${id}`
        )
        .then((res) => {
          alert("Sản phẩm đã được xóa thành công");
          navigate("/");
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
        });
    }
  };

  const handleCart = async () => {
    if (userId) {
      try {
        const response = await axios.post(
          `https://legitcheck.up.railway.app/api/Cart/AddItemToCart?userId=${userId}&productId=${id}&quantity=1`
        );
        alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    } else {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
      navigate("/login");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate("/");
  };

  const handleCheckShop = (shopId) => {
    navigate(`/scamshop/${shopId}`);
  };

  const handleShopDetail = (shopId) => {
    navigate(`/shopitem/${shopId}`);
  };

  return (
    <div className="container">
      <div className="top">
        <div className="arrow" onClick={handleBack}></div>
      </div>
      <div className="button-container">
        <div
          className="button-check-shop-1"
          onClick={() => handleCheckShop(product.shopId)}
        >
          Check shop
        </div>
        <div>
          <button
            className="button-57"
            role="button"
            onClick={() => handleShopDetail(product.shopId)}
          >
            <span className="text">Shop Detail</span>
            <span>Thông tin Shop</span>
          </button>
        </div>
      </div>

      <div className="image">
        <div>
          <img className="left-column" src={product.productImage} alt="" />
        </div>
      </div>

      <div className="right-column">
        <div className="product-description">
          <h1>{product.productName}</h1>
          <p>{product.productDescription}</p>
        </div>

        <div className="product-price">
          <span style={{ color: "red" }}>{product.productPrice}đ</span>
          {/* <Link to={`/updateProduct/${product.id}`} className="addToCartBtn">
            Update
          </Link> */}
          <button className="addToCartBtn" onClick={handleCart}>
            Add Cart
          </button>
          {/* <button className="addToCartBtn" onClick={handleUpdate}>
            Update
          </button>
          <button className="addToCartBtn" onClick={handleDelete}>
            Xóa
          </button> */}
        </div>
      </div>
    </div>
  );
};
