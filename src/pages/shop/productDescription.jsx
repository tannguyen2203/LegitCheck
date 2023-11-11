import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./productDescription.css";

export const ProductDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useParams();
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
    try {
      const response = await axios.post(
        `https://legitcheck.up.railway.app/api/Cart/AddItemToCart?userId=1&productId=${id}&quantity=1`
      );
      // Xử lý phản hồi từ API nếu cần
      console.log(response);
      alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

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
