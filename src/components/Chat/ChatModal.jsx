import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Bot, RefreshCw } from "lucide-react";
import { FullPageChat } from "flowise-embed-react";

const ChatModal = ({ onClose }) => {
  const [chatKey, setChatKey] = useState(Date.now());

  const handleRefresh = () => {
    // Clear Flowise chat data (use exact key if known)
    localStorage.clear();
    sessionStorage.clear();

    // Force reload the chat component
    setChatKey(Date.now());
  };

  return (
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
          <div className="chat-actions">
            {/* <button
              className="refresh-button"
              onClick={handleRefresh}
              title="Refresh Chat"
            >
              <RefreshCw className="w-5 h-5" />
            </button> */}
            <button
              className="close-button"
              onClick={onClose}
              title="Close Chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="chat-content">
          <FullPageChat
            key={chatKey}
            chatflowid="203f516c-89c9-4acb-8277-b06189893183"
            apiHost="https://cloud.flowiseai.com"
            chatflowConfig={{}}
            observersConfig={{}}
            theme={{}}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatModal;
