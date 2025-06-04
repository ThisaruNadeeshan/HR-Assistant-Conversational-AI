// Chat utility functions for better chat management

/**
 * Clear all Flowise-related storage
 */
export const clearFlowiseStorage = () => {
  try {
    // List of known Flowise storage keys
    const flowiseKeys = [
      'flowise-chatflow',
      'flowise-chat-history',
      'flowise-session',
      'chatflow-config',
      'chat-messages',
      'flowise-embed'
    ];

    // Clear specific localStorage keys
    flowiseKeys.forEach(key => {
      localStorage.removeItem(key);
    });

    // Clear any keys that contain 'flowise' or 'chatflow'
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.toLowerCase().includes('flowise') || 
          key.toLowerCase().includes('chatflow') || 
          key.toLowerCase().includes('chat-')) {
        localStorage.removeItem(key);
      }
    });

    // Clear sessionStorage as well
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.toLowerCase().includes('flowise') || 
          key.toLowerCase().includes('chatflow') || 
          key.toLowerCase().includes('chat-')) {
        sessionStorage.removeItem(key);
      }
    });

    console.log('✅ Chat storage cleared successfully');
    return true;
  } catch (error) {
    console.warn('⚠️ Error clearing chat storage:', error);
    return false;
  }
};

/**
 * Initialize chat with proper configuration
 */
export const initializeChat = () => {
  try {
    // Set initial welcome state
    const welcomeConfig = {
      hasShownWelcome: false,
      timestamp: Date.now()
    };

    localStorage.setItem('iris-ai-welcome', JSON.stringify(welcomeConfig));
    
    console.log('✅ Chat initialized successfully');
    return true;
  } catch (error) {
    console.warn('⚠️ Error initializing chat:', error);
    return false;
  }
};

/**
 * Get chat configuration for Flowise
 */
export const getChatConfig = () => {
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

/**
 * Handle chat ready state
 */
export const handleChatReady = (callback) => {
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
 * Format chat timestamp
 */
export const formatChatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Validate chat environment
 */
export const validateChatEnvironment = () => {
  const requirements = {
    flowiseEmbed: typeof window !== 'undefined' && window.FlowiseEmbed,
    localStorage: typeof Storage !== 'undefined',
    sessionStorage: typeof sessionStorage !== 'undefined'
  };

  const isValid = Object.values(requirements).every(Boolean);
  
  if (!isValid) {
    console.warn('⚠️ Chat environment validation failed:', requirements);
  }

  return isValid;
};

/**
 * Get or create unique session ID
 */
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('iris-ai-session-id');
  
  if (!sessionId) {
    sessionId = `iris-ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('iris-ai-session-id', sessionId);
  }
  
  return sessionId;
};

/**
 * Log chat analytics (optional)
 */
export const logChatEvent = (event, data = {}) => {
  try {
    const logData = {
      event,
      timestamp: Date.now(),
      sessionId: getSessionId(),
      ...data
    };

    // Store in sessionStorage for debugging
    const logs = JSON.parse(sessionStorage.getItem('iris-ai-logs') || '[]');
    logs.push(logData);
    
    // Keep only last 50 logs
    if (logs.length > 50) {
      logs.shift();
    }
    
    sessionStorage.setItem('iris-ai-logs', JSON.stringify(logs));
    
    // Console log for development
    console.log('📊 Chat Event:', logData);
  } catch (error) {
    console.warn('⚠️ Error logging chat event:', error);
  }
};