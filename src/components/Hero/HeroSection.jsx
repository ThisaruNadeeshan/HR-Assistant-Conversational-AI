import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import ChatPreview from "./ChatPreview";

const HeroSection = ({ toggleChat }) => (
  <section className="hero">
    <div className="hero-background"></div>
    <div className="hero-content">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hero-text"
      >
        <div className="hero-badge">
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI</span>
        </div>
        <h1 className="hero-title">
          Meet Your New <span className="gradient-text"> AI Assistant</span>
        </h1>
        <p className="hero-description">
          Experience the future of conversation with our intelligent chatbot...
        </p>
        <motion.button
          className="cta-button"
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-5 h-5" />
          Start Chatting Now
        </motion.button>
      </motion.div>
      <ChatPreview />
    </div>
  </section>
);

export default HeroSection;
