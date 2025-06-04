import React from "react";
import {
  Bot,
  Heart,
  Mail,
  Shield,
  Clock,
  Users,
  MessageCircle,
} from "lucide-react";
import "./Footer.css";

const Footer = ({ toggleChat }) => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Bot className="footer-logo-icon" />
              <span>Iris AI</span>
            </div>
            <p className="footer-tagline">
              Your intelligent HR assistant, making workplace interactions
              smarter and more efficient.
            </p>
            <button className="footer-chat-button" onClick={toggleChat}>
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

          {/* Navigation Links */}
          <div className="footer-links-section">
            {[
              {
                title: "Product",
                links: ["Features", "Get Started", "Demo", "Pricing"],
              },
              {
                title: "Company",
                links: ["About Us", "Contact", "Careers", "Blog"],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Privacy Policy",
                  "Terms of Service",
                  "Security",
                ],
              },
            ].map((group, idx) => (
              <div className="footer-links-group" key={idx}>
                <h4>{group.title}</h4>
                <div className="footer-links">
                  {group.links.map((link, i) => (
                    <a
                      key={i}
                      href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; {new Date().getFullYear()} Iris AI Assistant. All rights
              reserved.
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
