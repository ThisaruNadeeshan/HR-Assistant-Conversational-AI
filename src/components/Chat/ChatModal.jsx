import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Bot, RefreshCw, Minimize2 } from "lucide-react";
import { FullPageChat } from "flowise-embed-react";

const ChatModal = ({ onClose }) => {
  const [chatKey, setChatKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Handle chat ready state
  const handleChatReady = useCallback(() => {
    setIsLoading(false);
    console.log('✅ Chat is ready');
  }, []);

  // Safe chat storage clearing - without DOM manipulation
  const clearChatStorage = useCallback(() => {
    try {
      console.log('🧹 Starting safe chat cleanup...');
      
      // Clear localStorage safely
      const localKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.toLowerCase().includes('flowise') ||
          key.toLowerCase().includes('chatflow') ||
          key.toLowerCase().includes('chat') ||
          key.toLowerCase().includes('iris') ||
          key.includes('203f516c-89c9-4acb-8277-b06189893183')
        )) {
          localKeys.push(key);
        }
      }
      
      localKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`❌ Removed localStorage: ${key}`);
      });
      
      // Clear sessionStorage safely
      const sessionKeys = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (
          key.toLowerCase().includes('flowise') ||
          key.toLowerCase().includes('chatflow') ||
          key.toLowerCase().includes('chat') ||
          key.toLowerCase().includes('iris') ||
          key.includes('203f516c-89c9-4acb-8277-b06189893183')
        )) {
          sessionKeys.push(key);
        }
      }
      
      sessionKeys.forEach(key => {
        sessionStorage.removeItem(key);
        console.log(`❌ Removed sessionStorage: ${key}`);
      });
      
      console.log('✅ Safe chat cleanup completed');
      return true;
    } catch (error) {
      console.error('⚠️ Error during safe cleanup:', error);
      return false;
    }
  }, []);

  // Safe refresh without aggressive DOM manipulation
  const handleRefresh = useCallback(() => {
    console.log('🔄 Starting safe chat refresh...');
    
    // Set loading state
    setIsLoading(true);
    
    // Clear storage without touching DOM
    clearChatStorage();
    
    // Create new chat key
    const newChatKey = Date.now();
    
    // Use setTimeout to ensure React has time to update
    setTimeout(() => {
      setChatKey(newChatKey);
      console.log('🆕 New chat session:', newChatKey);
    }, 100);
    
  }, [clearChatStorage]);

  // Handle minimize/maximize
  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Simplified auto-detect for chat readiness
  useEffect(() => {
    // Start with loading state for each new chat
    setIsLoading(true);
    
    // Simple timeout approach to avoid React conflicts
    const readyTimer = setTimeout(() => {
      console.log('⏰ Chat marked as ready');
      setIsLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(readyTimer);
    };
  }, [chatKey]);

  return (
    <motion.div
      className="chat-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        className={`chat-container ${isMinimized ? 'minimized' : ''}`}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0,
          height: isMinimized ? '60px' : '90vh'
        }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="chat-header-bar">
          <div className="chat-title">
            <Bot className="w-5 h-5" />
            <span>Iris AI - HR Assistant</span>
            <div className="status-indicator">
              <div className="status-dot online"></div>
              <span className="status-text">Online</span>
            </div>
          </div>
          
          <div className="chat-actions">
            <button
              className="action-button"
              onClick={handleRefresh}
              title="Start New Chat"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              className="action-button"
              onClick={toggleMinimize}
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            
            <button
              className="action-button close"
              onClick={onClose}
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <div className="chat-content">
            {isLoading && (
              <div className="chat-loading">
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Starting fresh chat session...</p>
                </div>
              </div>
            )}
            
            <div className={`flowise-container ${isLoading ? 'hidden' : ''}`}>
              <FullPageChat
                key={chatKey}
                chatflowid="203f516c-89c9-4acb-8277-b06189893183"
                apiHost="https://cloud.flowiseai.com"
                chatflowConfig={{
                  welcomeMessage: "Hello! I'm Iris AI, your HR Assistant. How can I help you today?",
                }}
                observersConfig={{
                  observeMessages: (messages) => {
                    if (messages && messages.length > 0 && isLoading) {
                      handleChatReady();
                    }
                  }
                }}
                theme={{
                  button: {
                    backgroundColor: "#6366f1",
                    right: 20,
                    bottom: 20,
                    size: "medium",
                    iconColor: "white",
                  },
                  chatWindow: {
                    showTitle: false,
                    title: "Iris AI - HR Assistant",
                    titleAvatarSrc: "",
                    showAgentMessages: true,
                    welcomeMessage: "Hello! I'm Iris AI, your HR Assistant. I can help you with employee information, send professional emails, and answer HR-related questions. How can I assist you today?",
                    backgroundColor: "#ffffff",
                    height: "100%",
                    width: "100%",
                    fontSize: 16,
                    poweredByTextColor: "#999999",
                    botMessage: {
                      backgroundColor: "#f7f8ff",
                      textColor: "#374151",
                      showAvatar: true,
                      avatarSrc: "",
                    },
                    userMessage: {
                      backgroundColor: "#6366f1",
                      textColor: "#ffffff",
                      showAvatar: true,
                      avatarSrc: "",
                    },
                    textInput: {
                      placeholder: "Type your message here...",
                      backgroundColor: "#ffffff",
                      textColor: "#374151",
                      sendButtonColor: "#6366f1",
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatModal;