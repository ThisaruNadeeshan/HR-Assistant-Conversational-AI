import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingChatButton = ({ onClick }) => (
  <motion.button
    className="floating-chat-button"
    onClick={onClick}
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    exit={{ scale: 0, rotate: 180 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <MessageCircle className="w-6 h-6" />
    <div className="chat-notification">
      <div className="notification-dot"></div>
    </div>
  </motion.button>
);

export default FloatingChatButton;
