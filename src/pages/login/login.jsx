import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `https://legitcheck.up.railway.app/api/User/LoginUser?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`;

      const response = await axios.get(url);
      console.log(response);
      const userEmail = response.data.userEmail;
      const userPassword = response.data.userPassord;
      if (email === userEmail && password === userPassword) {
        localStorage.setItem("userToken", JSON.stringify(response));
        localStorage.setItem("userId", response.data.id);
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleShopLogin = () => {
    navigate("/loginshop");
  };

  return (
    <div className="login-form">
      <form>
        <h1>Đăng nhập</h1>
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
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Sign in</button>
          <button onClick={handleShopLogin}>Login for Shop</button>
        </div>
      </form>
    </div>
  );
};
