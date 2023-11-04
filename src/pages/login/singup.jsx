import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleBack = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPhone = parseInt(phone, 10);

    const apiUrl = "https://localhost:7010/api/User/CreateUser";
    const urlParams = new URLSearchParams();

    urlParams.append("userName", fullName);
    urlParams.append("userMail", email);
    urlParams.append("phone", formattedPhone);
    urlParams.append("password", password);
    urlParams.append("address", address);

    const data = {
      userName: fullName,
      userEmail: email,
      phone: formattedPhone,
      password: password,
      address: address,
    };

    const newApiUrl = `${apiUrl}?${urlParams.toString()}`;

    axios
      .post(newApiUrl, data)
      .then((res) => {
        alert("Đăng ký thành công");
        console.log(res);
        navigate(`/login`);
      })
      .catch((err) => console.log(err));

    console.log(data);
  };

  return (
    <div>
      <form className="form-signup" onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Nhập địa chỉ email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Họ và tên</label>
          <input
            type="text"
            id="fullname"
            placeholder="Nhập họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group submit-btn">
          <input type="submit" value="Submit" />
        </div>
        <button className="button-back" onClick={handleBack}>
          Back
        </button>
      </form>
    </div>
  );
};
