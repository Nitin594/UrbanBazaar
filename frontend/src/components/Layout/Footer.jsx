import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / About */}
        <div className="footer-section">
          <h2 className="footer-logo">UrbanBazaar</h2>
          <p>
            Your one-stop shop for trendy fashion, electronics, and essentials.
            Experience shopping with style.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/deals">Deals</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} UrbanBazaar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
