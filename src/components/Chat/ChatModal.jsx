import React from "react";
import { motion } from "framer-motion";
import { X, Bot } from "lucide-react";
import { FullPageChat } from "flowise-embed-react";

const ChatModal = ({ onClose }) => (
  <motion.div
    className="chat-modal"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="chat-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="chat-header-bar">
        <div className="chat-title">
          <Bot className="w-5 h-5" />
          AI Assistant
        </div>
        <button className="close-button" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="chat-content">
        <FullPageChat
          chatflowid="203f516c-89c9-4acb-8277-b06189893183"
          apiHost="https://cloud.flowiseai.com"
          chatflowConfig={{}}
          observersConfig={{}}
          theme={
            {
              // your chat theme setup here
            }
          }
        />
      </div>
    </motion.div>
  </motion.div>
);

export default ChatModal;
