import React from "react";
import "./footer.css";

const handlePocily = () => {
  window.location.href =
    "https://www.facebook.com/legitchecksg?mibextid=LQQJ4d";
};

export const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>LegitCheck</h1>
            <p>Fpt University</p>
          </div>
          <div className="col">
            <h2>Liên hệ với chúng tôi</h2>
            <p> +255 752 186 174</p>
            <p> legitcheck@gmail.com</p>
            <p> Tp.Hồ Chí Minh </p>
          </div>
          <div className="col">
            <h2>Về chúng tôi</h2>
            <p style={{ cursor: "pointer" }} onClick={handlePocily}>
              Hỗ trợ
            </p>
            <p style={{ cursor: "pointer" }} onClick={handlePocily}>
              Chính sách
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} LEGIT CHECK | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};
