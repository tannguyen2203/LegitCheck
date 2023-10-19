import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Alert } from "bootstrap";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://localhost:7010/api/User/LoginUser?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      const userName = response.data.userName;
      const userEmail = response.data.userEmail;
      const userPassowrd = response.data.userPassord;
      if (email === userEmail && password === userPassowrd) {
        console.log("Logged in successfully");
        setLoggedIn(true);
        setUserName(userName);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/", { state: { userName, loggedIn } });
    }
  }, [loggedIn, userName]);

  const handleRegister = () => {};

  return (
    <div className="login-form">
      <form>
        <h1>Login</h1>
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
          <a href="#" className="link">
            Forgot Your Password?
          </a>
        </div>
        <div className="action">
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Sign in</button>
        </div>
      </form>
    </div>
  );
};
