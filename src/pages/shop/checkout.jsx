import React from "react";
import qrImage from "./qr.jpg";

export const CheckOut = () => {
  return (
    <div className="container">
      <div>
        <img src={qrImage} className="left-column" alt="" />
      </div>

      <div className="right-column">
        <div className="product-description">
          <h1>Quét mã QR để thanh toán</h1>
          <p>Chúc bạn mua hàng vui vẻ !</p>
          <p>Sau khi thanh toán chúng tôi sẽ gửi thông tin đến bạn !</p>
        </div>
      </div>
    </div>
  );
};
