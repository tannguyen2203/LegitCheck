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
          console.log(res);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
        });
    }
  };

  const handleUpdate = () => {
    navigate(`/updateProduct/${product.id}`);
  };

  const handleCart = async () => {
    if (userId) {
      // Kiểm tra nếu userId đã được lưu trong Local Storage
      try {
        const response = await axios.post(
          `https://legitcheck.up.railway.app/api/Cart/AddItemToCart?userId=${userId}&productId=${id}&quantity=1`
        );
        console.log(response);
        alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    } else {
      // Nếu userId không tồn tại trong Local Storage, yêu cầu người dùng đăng nhập trước khi thêm vào giỏ hàng
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
      navigate("/login"); // Điều hướng đến trang đăng nhập
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="top">
        <div className="arrow" onClick={handleBack}></div>
      </div>
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
