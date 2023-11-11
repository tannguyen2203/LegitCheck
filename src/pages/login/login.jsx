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
      let item = { email, password };
      let result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });

      result = await result.json();

      // Kiểm tra các điều kiện khác để xác định kết quả đăng nhập
      if (result && result.userEmail && result.userPassord) {
        const userEmail = result.userEmail;
        const userPassword = result.userPassord;
        if (email === userEmail && password === userPassword) {
          localStorage.setItem("userToken", JSON.stringify(result));
          localStorage.setItem("userId", result.id);
          navigate("/");
        } else {
          alert("Sai mật khẩu hoặc password");
          // Hoặc thực hiện các hành động khác khi mật khẩu không đúng
        }
      } else {
        alert("Dữ liệu không hợp lệ từ server");
      }
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
