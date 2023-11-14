import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateScam = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bankId, setBankId] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(0);
  const [shopId, setShopId] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      // Chuyển đổi từ chuỗi sang số và gán vào state
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const apiUrl = "https://legitcheck.up.railway.app/api/Scam/CreateScamPost";
  const urlParams = new URLSearchParams();
  urlParams.append("scammerName", name);
  urlParams.append("bankId", bankId);
  urlParams.append("description", description);
  urlParams.append("userId", userId);
  urlParams.append("shopId", shopId);
  const newApiUrl = `${apiUrl}?${urlParams.toString()}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(newApiUrl)
      .then((res) => {
        alert("Tạo bài thành công");
        navigate("/scam");
        console.log(res);
      })
      .catch((err) => {
        console.error("Lỗi khi tạo scam:", err.response.data);
      });

    setName("");
    setBankId("");
    setDescription("");
    setUserId(0);
    setShopId(0);
  };

  return (
    <div className="container-shop mt-5">
      <h2>Tạo post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên người tố cáo</label>
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
          <label htmlFor="bank">Bank ID</label>
          <input
            type="text"
            className="form-control"
            id="bank"
            placeholder="Enter Bank Id"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
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
          <label htmlFor="shopId">ShopId</label>
          <input
            type="number"
            className="form-control"
            id="shopId"
            placeholder="Enter product quantity"
            value={shopId}
            onChange={(e) => setShopId(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
