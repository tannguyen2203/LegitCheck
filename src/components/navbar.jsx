import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import logo from "./logo.jpg";
import "./navbar.css";

export const Navbar = () => {
  const location = useLocation();
  const userName = location.state?.userName || "";
  const loggedIn = location.state?.loggedIn || false;

  console.log(userName);

  return (
    <div className="navbar">
      <div>
        <img className="logo" src={logo} />
      </div>
      <div className="links">
        <div className="check-legit-btn">
          <Link>Check legit</Link>
        </div>
        <Link to="/">Trang chủ</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        {/* <Link to="/createProduct">Product Management</Link> */}
        <div>
          {loggedIn ? (
            <div>
              <Link to="/">
                <UserCircle size={50} />
              </Link>
              <p>Welcome, {userName}!</p>
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
