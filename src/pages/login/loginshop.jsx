import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export const LoginShop = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/login");
  };

  const handleShopLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://legitcheck.up.railway.app/api/Shop/LoginShop?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      const userEmail = response.data.shopEmail;
      const userPassword = response.data.shopPassword;
      if (email === userEmail && password === userPassword) {
        console.log(response.data);
        console.log("Logged in successfully");
        localStorage.setItem("shopToken", JSON.stringify(response));
        localStorage.setItem("shopId", response.data.id);
        navigate("/shopcrud");
      } else {
        alert("Invalid email or password");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <form>
        <h1>Shop Đăng nhập</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="action">
          <button onClick={handleRegister}>User Login</button>
          <button onClick={handleShopLogin}>Sign in</button>
        </div>
      </form>
    </div>
  );
};
