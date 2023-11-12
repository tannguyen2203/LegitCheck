import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import "./createForm.css";

export const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [brand, setBrand] = useState("");
  const [createDate, setCreateDate] = useState(new Date().toLocaleString());
  const [shopId, setShopId] = useState(0);

  const formattedId = parseInt(shopId, 10);
  const formattedPrice = parseInt(price, 10);

  const apiUrl = `https://legitcheck.up.railway.app/api/Product/UpdateProduct?id=${id}`;
  const urlParams = new URLSearchParams();

  urlParams.append("ProductName", name);
  urlParams.append("ProductPrice", price);
  urlParams.append("ProductDescription", description);
  urlParams.append("ProductImage", img);
  urlParams.append("Brand", brand);
  urlParams.append("CreateDate", createDate);
  urlParams.append("ShopId", shopId);

  const data = {
    ProductName: name,
    ProductPrice: formattedPrice,
    ProductDescription: description,
    ProductImage: img,
    Brand: brand,
    CreateDate: createDate,
    ShopId: formattedId,
  };

  const newApiUrl = `${apiUrl}&${urlParams.toString()}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(newApiUrl, data)
      .then((res) => {
        alert("Sửa sản phẩm thành công");
        console.log(res);
        navigate(`/shopcrud`);
      })
      .catch((err) => console.log(err));

    console.log(data);

    setName("");
    setPrice(0);
    setDescription("");
    setImg("");
    setBrand("");
    setShopId("");
  };

  return (
    <div className="container-shop mt-5">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá tiền</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Mô tả sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter product price"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Link ảnh sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Thương hiệu</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            placeholder="Enter product quantity"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Id">ShopId</label>
          <input
            type="number"
            className="form-control"
            id="adminId"
            placeholder="Enter product quantity"
            value={shopId}
            onChange={(e) => setShopId(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};
