import React, { useState } from "react";

import "./createForm.css";
import axios from "axios";

export const CreateForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [brand, setBrand] = useState("");
  const [createDate, setCreateDate] = useState(new Date().toLocaleString());
  const [id, setId] = useState(0);

  const formattedId = parseInt(id, 10);
  const formattedPrice = parseInt(price, 10);

  const apiUrl = "https://localhost:7010/api/Product/CreateProduct";
  const urlParams = new URLSearchParams();

  urlParams.append("ProductName", name);
  urlParams.append("ProductPrice", price);
  urlParams.append("ProductDescription", description);
  urlParams.append("ProductImage", img);
  urlParams.append("Brand", brand);
  urlParams.append("CreateDate", createDate);
  urlParams.append("ShopId", id);

  const data = {
    ProductName: name,
    ProductPrice: formattedPrice,
    ProductDescription: description,
    ProductImage: img,
    Brand: brand,
    CreateDate: createDate,
    ShopId: formattedId,
  };

  const newApiUrl = `${apiUrl}?${urlParams.toString()}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(newApiUrl, data)
      .then((res) => {
        alert("Thêm sản phẩm thành công");
        console.log(res);
      })
      .catch((err) => console.log(err));

    console.log(data);

    setName("");
    setPrice(0);
    setDescription("");
    setImg("");
    setBrand("");
    setId("");
  };

  return (
    <div className="container-shop mt-5">
      <h2>Create Product</h2>
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
          <label htmlFor="Id">Id</label>
          <input
            type="number"
            className="form-control"
            id="adminId"
            placeholder="Enter product quantity"
            value={id}
            onChange={(e) => setId(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};
