import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./scam.css";

export const Scam = () => {
  const [scamPosts, setScamPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://legitcheck.up.railway.app/api/Scam/GetAllScamPost")
      .then((response) => setScamPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container2">
      <Link to="/createscam" className="button-1">
        Tạo bài post
      </Link>
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
