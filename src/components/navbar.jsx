import React, { useState, useE } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.jpg";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || "";
  const loggedIn = location.state?.loggedIn || false;

  const handleLogout = () => {};
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div>
        <img className="logo" src={logo} onClick={handleBack} />
      </div>
      <div className="links">
        <div className="check-legit-btn">
          <Link to="/scam">Check legit</Link>
        </div>
        <Link to="/">Trang chủ</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>

        <div>
          {loggedIn ? (
            <div>
              <Link to="/">
                <UserCircle size={50} />
              </Link>
              <p>Welcome, {userName}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <span style={{ display: "none" }}>Login</span>
                <UserCircle size={32} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
