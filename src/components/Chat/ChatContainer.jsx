import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FullPageChat } from 'flowise-embed-react';

// Inline utility functions to avoid import issues
const getChatConfig = () => {
  return {
    chatflowConfig: {
      welcomeMessage: "Hello! I'm Iris AI, your HR Assistant. I can help you with employee information, send professional emails, and answer HR-related questions. How can I assist you today?",
      starterPrompts: [
        "Show me employee information",
        "Help me write a professional email",
        "What can you help me with?",
        "How do I search for employees?"
      ]
    },
    theme: {
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
          maxChars: 1000,
        }
      }
    }
  };
};

const logChatEvent = (event, data = {}) => {
  console.log(`🤖 Chat Event: ${event}`, data);
};

const handleChatReadyUtil = (callback) => {
  // Use MutationObserver to detect when Flowise chat is fully loaded
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Look for chat interface elements
      const chatElements = document.querySelectorAll('[class*="flowise"], [id*="flowise"], .chat-container, .message-container');
      
      if (chatElements.length > 0) {
        // Chat is loaded
        callback && callback();
        observer.disconnect();
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Fallback timeout
  setTimeout(() => {
    callback && callback();
    observer.disconnect();
  }, 3000);
};

/**
 * ChatContainer - Wrapper component for Flowise chat with enhanced functionality
 */
const ChatContainer = ({ 
  chatKey, 
  onReady, 
  onError,
  className = '',
  ...props 
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const chatRef = useRef(null);
  const initTimeoutRef = useRef(null);

  // Get chat configuration
  const { chatflowConfig, theme } = getChatConfig();

  // Handle chat initialization
  const handleChatInitialization = useCallback(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      setHasError(false);
      onReady && onReady();
      logChatEvent('chat_container_ready', { messageCount });
    }
  }, [isInitialized, onReady, messageCount]);

  // Handle errors
  const handleChatError = useCallback((error) => {
    setHasError(true);
    setIsInitialized(false);
    onError && onError(error);
    logChatEvent('chat_container_error', { error: error.message || error });
  }, [onError]);

  // Monitor chat messages
  const handleMessageObserver = useCallback((messages) => {
    if (messages && Array.isArray(messages)) {
      setMessageCount(messages.length);
      
      // If we have messages and chat isn't marked as ready, mark it ready
      if (messages.length > 0 && !isInitialized) {
        handleChatInitialization();
      }
    }
  }, [isInitialized, handleChatInitialization]);

  // Setup chat ready detection
  useEffect(() => {
    // Clear any existing timeout
    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current);
    }

    // Reset state for new chat instance
    setIsInitialized(false);
    setHasError(false);
    setMessageCount(0);

    // Use utility function to handle chat ready
    handleChatReadyUtil(() => {
      handleChatInitialization();
    });

    // Fallback timeout to ensure chat is marked as ready
    initTimeoutRef.current = setTimeout(() => {
      if (!isInitialized && !hasError) {
        console.log('Chat initialization timeout - marking as ready');
        handleChatInitialization();
      }
    }, 5000);

    // Cleanup
    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
    };
  }, [chatKey, handleChatInitialization, isInitialized, hasError]);

  // Enhanced observers configuration
  const observersConfig = {
    // Observe when messages are added/updated
    observeMessages: handleMessageObserver,
    
    // Observe when chat input changes
    observeUserInput: (input) => {
      logChatEvent('user_typing', { inputLength: input?.length || 0 });
    },
    
    // Observe when chat is loading
    observeLoading: (loading) => {
      logChatEvent('chat_loading_state', { loading });
    }
  };

  // Enhanced chatflow configuration
  const enhancedChatflowConfig = {
    ...chatflowConfig,
    // Additional configuration for better UX
    sessionId: `iris-ai-${Date.now()}`,
    streaming: true,
    uploads: false, // Disable file uploads for HR assistant
    ...props.chatflowConfig
  };

  // Enhanced theme configuration
  const enhancedTheme = {
    ...theme,
    chatWindow: {
      ...theme.chatWindow,
      // Override with any custom theme props
      ...props.theme?.chatWindow
    }
  };

  return (
    <div 
      ref={chatRef}
      className={`chat-container-wrapper ${className}`}
      data-initialized={isInitialized}
      data-error={hasError}
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        ...props.style
      }}
    >
      {/* Error State */}
      {hasError && (
        <div className="chat-error-state">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h3>Chat Temporarily Unavailable</h3>
            <p>We're having trouble connecting to Iris AI. Please try refreshing the chat.</p>
            <button 
              className="retry-button"
              onClick={() => {
                setHasError(false);
                setIsInitialized(false);
                window.location.reload();
              }}
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Flowise Chat Component */}
      {!hasError && (
        <FullPageChat
          key={chatKey}
          chatflowid="203f516c-89c9-4acb-8277-b06189893183"
          apiHost="https://cloud.flowiseai.com"
          chatflowConfig={enhancedChatflowConfig}
          observersConfig={observersConfig}
          theme={enhancedTheme}
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
            background: 'transparent'
          }}
        />
      )}

      {/* Development Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="chat-debug-info">
          <small>
            Ready: {isInitialized ? '✅' : '⏳'} | 
            Messages: {messageCount} | 
            Key: {chatKey}
          </small>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;