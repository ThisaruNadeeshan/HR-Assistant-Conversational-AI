import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Bot, RefreshCw, Minimize2 } from "lucide-react";
import { FullPageChat } from "flowise-embed-react";

const ChatModal = ({ onClose }) => {
  const [chatKey, setChatKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Enhanced chat ready detection with aggressive scroll setup
  const handleChatReady = useCallback(() => {
    setIsLoading(false);
    console.log("✅ Chat is ready");

    // Aggressive scroll enabler after chat loads
    const enableScrolling = () => {
      try {
        // Target the Flowise container
        const chatContainer = document.querySelector(".flowise-container");
        if (chatContainer) {
          console.log("🎯 Found chat container, applying scroll fixes...");

          // Force scrolling on all elements within Flowise
          const allElements = chatContainer.querySelectorAll("*");
          allElements.forEach((element, index) => {
            const computedStyle = window.getComputedStyle(element);

            // Check if element needs scrolling
            if (element.scrollHeight > element.clientHeight) {
              element.style.overflowY = "auto";
              element.style.overflowX = "hidden";
              element.style.scrollBehavior = "smooth";
              console.log(`📜 Enabled scrolling on element ${index}`);
            }

            // Force specific styles for common problematic elements
            if (
              computedStyle.overflow === "hidden" ||
              computedStyle.overflowY === "hidden"
            ) {
              element.style.overflowY = "auto";
              element.style.maxHeight = "100%";
              console.log(`🔧 Fixed hidden overflow on element ${index}`);
            }

            // Target iframe specifically
            if (element.tagName === "IFRAME") {
              element.style.height = "100%";
              element.style.width = "100%";
              console.log("🖼️ Fixed iframe dimensions");
            }

            // Target div elements with height styles
            if (
              element.tagName === "DIV" &&
              (element.style.height || computedStyle.height)
            ) {
              element.style.overflowY = "auto";
              element.style.height = "auto";
              element.style.maxHeight = "100%";
              element.style.flex = "1";
            }
          });

          // Apply specific fixes to the chat container itself
          chatContainer.style.height = "100%";
          chatContainer.style.overflowY = "auto";
          chatContainer.style.display = "flex";
          chatContainer.style.flexDirection = "column";

          // Find and fix the main chat content area
          const chatContent = chatContainer.querySelector("div");
          if (chatContent) {
            chatContent.style.height = "100%";
            chatContent.style.overflowY = "auto";
            chatContent.style.flex = "1";
            chatContent.style.display = "flex";
            chatContent.style.flexDirection = "column";
            console.log("📱 Fixed main chat content area");
          }

          console.log("✅ Scroll fixes applied successfully");
        }
      } catch (error) {
        console.error("❌ Error applying scroll fixes:", error);
      }
    };

    // Apply scroll fixes immediately and with delays
    enableScrolling();
    setTimeout(enableScrolling, 500);
    setTimeout(enableScrolling, 1000);
    setTimeout(enableScrolling, 2000);

    // Set up observer for dynamic content
    const observer = new MutationObserver(() => {
      enableScrolling();
    });

    const chatContainer = document.querySelector(".flowise-container");
    if (chatContainer) {
      observer.observe(chatContainer, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      // Disconnect observer after 10 seconds to prevent memory leaks
      setTimeout(() => observer.disconnect(), 10000);
    }
  }, []);

  // Safe chat storage clearing - without DOM manipulation
  const clearChatStorage = useCallback(() => {
    try {
      console.log("🧹 Starting safe chat cleanup...");

      // Clear localStorage safely
      const localKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          (key.toLowerCase().includes("flowise") ||
            key.toLowerCase().includes("chatflow") ||
            key.toLowerCase().includes("chat") ||
            key.toLowerCase().includes("iris") ||
            key.includes("08e769fe-332f-4a2d-bc2a-03065a16d7c2"))
        ) {
          localKeys.push(key);
        }
      }

      localKeys.forEach((key) => {
        localStorage.removeItem(key);
        console.log(`❌ Removed localStorage: ${key}`);
      });

      // Clear sessionStorage safely
      const sessionKeys = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (
          key &&
          (key.toLowerCase().includes("flowise") ||
            key.toLowerCase().includes("chatflow") ||
            key.toLowerCase().includes("chat") ||
            key.toLowerCase().includes("iris") ||
            key.includes("08e769fe-332f-4a2d-bc2a-03065a16d7c2"))
        ) {
          sessionKeys.push(key);
        }
      }

      sessionKeys.forEach((key) => {
        sessionStorage.removeItem(key);
        console.log(`❌ Removed sessionStorage: ${key}`);
      });

      console.log("✅ Safe chat cleanup completed");
      return true;
    } catch (error) {
      console.error("⚠️ Error during safe cleanup:", error);
      return false;
    }
  }, []);

  // Safe refresh without aggressive DOM manipulation
  const handleRefresh = useCallback(() => {
    console.log("🔄 Starting safe chat refresh...");

    // Set loading state
    setIsLoading(true);

    // Clear storage without touching DOM
    clearChatStorage();

    // Create new chat key
    const newChatKey = Date.now();

    // Use setTimeout to ensure React has time to update
    setTimeout(() => {
      setChatKey(newChatKey);
      console.log("🆕 New chat session:", newChatKey);
    }, 100);
  }, [clearChatStorage]);

  // Handle minimize/maximize
  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Simplified auto-detect for chat readiness
  useEffect(() => {
    // Start with loading state for each new chat
    setIsLoading(true);

    // Simple timeout approach to avoid React conflicts
    const readyTimer = setTimeout(() => {
      console.log("⏰ Chat marked as ready");
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
        className={`chat-container ${isMinimized ? "minimized" : ""}`}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          height: isMinimized ? "60px" : "90vh",
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
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
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

            <div className={`flowise-container ${isLoading ? "hidden" : ""}`}>
              <FullPageChat
                key={chatKey}
                chatflowid="08e769fe-332f-4a2d-bc2a-03065a16d7c2"
                apiHost="http://localhost:3000"
                chatflowConfig={{
                  welcomeMessage:
                    "Hello! I'm Iris AI, your HR Assistant. How can I help you today?",
                }}
                observersConfig={{
                  observeMessages: (messages) => {
                    if (messages && messages.length > 0 && isLoading) {
                      handleChatReady();
                    }
                  },
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
                    avatarSrc:
                      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740",
                    titleAvatarSrc:
                      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740",
                    showAgentMessages: true,
                    welcomeMessage:
                      "Hello! I'm Iris AI, your HR Assistant. I can help you with employee information, send professional emails, and answer HR-related questions. How can I assist you today?",
                    backgroundColor: "#ffffff",
                    height: "100%",
                    width: "100%",
                    fontSize: 16,
                    poweredByTextColor: "#999999",
                    botMessage: {
                      backgroundColor: "#f7f8ff",
                      textColor: "#374151",
                      showAvatar: true,
                      avatarSrc:
                        "https://stsloc.com/wp-content/uploads/2022/12/cropped-cropped-Logo-PNG.png",
                    },
                    userMessage: {
                      backgroundColor: "#6366f1",
                      textColor: "#ffffff",
                      showAvatar: true,
                      avatarSrc:
                        "data:image/png;base64,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",
                    },
                    textInput: {
                      placeholder: "Type your message here...",
                      backgroundColor: "#ffffff",
                      textColor: "#374151",
                      sendButtonColor: "#6366f1",
                    },
                  },
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  overflow: "hidden",
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
