import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">UrbanBazaar</div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/deals">Deals</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/cart">Cart 🛒</a></li>
      </ul>
      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
};

export default Header;
