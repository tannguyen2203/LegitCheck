import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./scam.css";

export const Scam = () => {
  const [scamPosts, setScamPosts] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return localStorage.getItem("userToken") !== null;
  };

  const handleCreatePost = () => {
    if (isLoggedIn()) {
      navigate("/createscam");
    } else {
      alert("Vui lòng đăng nhập trước khi tạo bài post");
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get("https://legitcheck.up.railway.app/api/Scam/GetAllScamPost")
      .then((response) => setScamPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container2">
      <button className="button-1" onClick={handleCreatePost}>
        Tạo bài post
      </button>
      {scamPosts.map((scamPost) => (
        <div
          className="item"
          key={scamPost.id}
          style={{ "--length": 5, "--i": 1 }}
        >
          <div className="item-header">
            <h3>{scamPost.scammerName}</h3>
          </div>
          <p>{scamPost.description}</p>
          <Link to={`/scamdescription/${scamPost.id}`}>Xem chi tiết</Link>
        </div>
      ))}
    </div>
  );
};
