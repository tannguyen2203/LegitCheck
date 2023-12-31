import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import "./scamDescription.css";

export const ScamDescription = () => {
  const [scamData, setScamData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://legitcheck.up.railway.app/api/Scam/GetScamPostById/${id}`)
      .then((response) => {
        setScamData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scam data:", error);
      });
  }, [id]);

  const handleBack = () => {
    navigate("/scam");
  };

  return (
    <div>
      <div
        className="arrow"
        style={{ marginRight: "1000px" }}
        onClick={handleBack}
      ></div>
      <div className="login-form">
        <div className="item-container">
          <div className="top"></div>
          {scamData && (
            <>
              <div className="item">
                <img
                  className="img-scam"
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQo3wFzhBt7BKiQQMME17EeTkF8PbLrULhGDbFejOs7EIwgs_vG"
                />
                <div className="item-label">Tên:</div>
                <div className="item-value">{scamData.scammerName}</div>
              </div>
              <div className="item">
                <div className="item-label">Ảnh:</div>
                <div>
                  {scamData.scamImages &&
                    scamData.scamImages.map((imageUrl, index) => (
                      <img key={index} src={imageUrl.imageUrl} />
                    ))}
                </div>
              </div>
              <div className="item">
                <img
                  className="img-scam"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIqACeX77BfhLBBE5XbNf0EzQLBLN-JbknpFYyjzhaD1571OO"
                />
                <div className="item-label">Nội dung tố cáo:</div>
                <div className="item-value">{scamData.description}</div>
              </div>
              <div className="item">
                <img
                  className="img-scam"
                  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQghCeqBg9pzi23QQEGwOw2AcNvTyjxQakASpGldyEe4ns0m70_"
                />
                <div className="item-label">STK:</div>
                <div className="item-value">{scamData.bankId}</div>
              </div>

              <div className="item">
                <img
                  className="img-scam"
                  src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSjEBtO6mfYyUNImQDgttMG-s8f7mxA8QW7VGzS-iJmoMm5qO7s"
                />
                <div className="item-label">Shop Id:</div>
                <div className="item-value">{scamData.shopId}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
