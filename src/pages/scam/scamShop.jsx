import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./scam.css";

export const ScamShop = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [scamPosts, setScamPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://legitcheck.up.railway.app/api/Scam/GetScamPostByShopId/${shopId}`
      )
      .then((response) => {
        setScamPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [shopId]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container2">
      <div>
        <Link to="/createscam" className="button-1">
          Tạo bài post
        </Link>
      </div>
      <div className="top">
        <div
          className="arrow"
          style={{ marginRight: "1000px" }}
          onClick={handleBack}
        ></div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : scamPosts.length === 0 ? (
        <h1>Shop hiện chưa có báo cáo lừa đảo nào.</h1>
      ) : (
        scamPosts.map((scamPost) => (
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
        ))
      )}
    </div>
  );
};
