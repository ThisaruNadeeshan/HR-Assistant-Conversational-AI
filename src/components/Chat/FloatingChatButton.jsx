import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Bot } from "lucide-react";

const FloatingChatButton = ({ onClick, hasUnread = false }) => {
  return (
    <motion.button
      className="floating-chat-button"
      onClick={onClick}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Open chat with Iris AI"
      title="Chat with Iris AI - HR Assistant"
    >
      <Bot className="w-6 h-6" />

      {hasUnread && (
        <motion.div
          className="chat-notification"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="notification-dot"></div>
        </motion.div>
      )}

      {/* Pulse effect for attention */}
      <motion.div
        className="pulse-ring"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          zIndex: -1,
        }}
      />
    </motion.button>
  );
};

export default FloatingChatButton;
