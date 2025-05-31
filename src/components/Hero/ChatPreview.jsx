import React from "react";
import { motion } from "framer-motion";

const ChatPreview = () => (
  <motion.div
    className="hero-visual"
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
  >
    <div className="chat-preview">
      <div className="chat-header">
        <div className="chat-avatar"></div>
        <div className="chat-info">
          <div className="chat-name">AI Assistant</div>
          <div className="chat-status">Online</div>
        </div>
      </div>
      <div className="chat-messages">
        {[
          "Hello! How can I help you today?",
          "What can you do?",
          "I can help with questions...",
        ].map((msg, i) => (
          <motion.div
            key={i}
            className={`message ${i % 2 ? "user-message" : "bot-message"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.5, duration: 0.5 }}
          >
            {msg}
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default ChatPreview;
