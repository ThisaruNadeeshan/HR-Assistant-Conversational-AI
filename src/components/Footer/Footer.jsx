import React from "react";
import { Bot, Heart, Mail, Shield, Clock, Users, MessageCircle } from "lucide-react";
import "./Footer.css";

const Footer = ({ toggleChat }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <Bot className="footer-logo-icon" />
              <span>Iris AI</span>
            </div>
            <p className="footer-tagline">
              Your intelligent HR assistant, making workplace interactions smarter and more efficient.
            </p>
            
            {/* Chat CTA Button */}
            <button 
              className="footer-chat-button"
              onClick={toggleChat}
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat with Iris AI
            </button>
            
            <div className="footer-stats">
              <div className="stat-item">
                <Users className="w-4 h-4" />
                <span>1000+ Users</span>
              </div>
              <div className="stat-item">
                <Clock className="w-4 h-4" />
                <span>24/7 Available</span>
              </div>
              <div className="stat-item">
                <Shield className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
          
          <div className="footer-links-section">
            <div className="footer-links-group">
              <h4>Product</h4>
              <div className="footer-links">
                <a href="#features">Features</a>
                <a href="#get-started">Get Started</a>
                <a href="#demo">Demo</a>
                <a href="#pricing">Pricing</a>
              </div>
            </div>
            
            <div className="footer-links-group">
              <h4>Company</h4>
              <div className="footer-links">
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
                <a href="#careers">Careers</a>
                <a href="#blog">Blog</a>
              </div>
            </div>
            
            <div className="footer-links-group">
              <h4>Support</h4>
              <div className="footer-links">
                <a href="#help">Help Center</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#security">Security</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; {new Date().getFullYear()} Iris AI Assistant. All rights reserved.
            </p>
            <div className="footer-love">
              <span>Made with</span>
              <Heart className="heart-icon" />
              <span>for better HR experiences</span>
            </div>
            <div className="footer-contact">
              <Mail className="w-4 h-4" />
              <a href="mailto:hello@iris-ai.com">hello@iris-ai.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;