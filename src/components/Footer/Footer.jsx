import React from "react";
import "./Footer.css"; // Optional: if you want to add custom styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <h3 className="footer-logo">AI Assistant</h3>
          <p className="footer-tagline">
            Smarter conversations. Anytime. Anywhere.
          </p>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#get-started">Get Started</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} AI Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
