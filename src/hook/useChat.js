import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  clearFlowiseStorage, 
  initializeChat, 
  getChatConfig, 
  logChatEvent,
  getSessionId 
} from '../utils/chatUtils';

/**
 * Custom hook for managing chat state and interactions
 */
export const useChat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [chatKey, setChatKey] = useState(Date.now());
  const [error, setError] = useState(null);
  
  const chatReadyRef = useRef(false);
  const sessionIdRef = useRef(getSessionId());

  // Initialize chat on mount
  useEffect(() => {
    initializeChat();
    logChatEvent('chat_hook_initialized');
  }, []);

  // Handle chat ready state
  const handleChatReady = useCallback(() => {
    if (!chatReadyRef.current) {
      setIsLoading(false);
      chatReadyRef.current = true;
      logChatEvent('chat_ready');
    }
  }, []);

  // Open chat
  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    logChatEvent('chat_opened');
  }, []);

  // Close chat
  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    logChatEvent('chat_closed');
  }, []);

  // Toggle chat
  const toggleChat = useCallback(() => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }, [isOpen, closeChat, openChat]);

  // Minimize chat
  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
    logChatEvent('chat_minimized');
  }, []);

  // Maximize chat
  const maximizeChat = useCallback(() => {
    setIsMinimized(false);
    logChatEvent('chat_maximized');
  }, []);

  // Toggle minimize
  const toggleMinimize = useCallback(() => {
    if (isMinimized) {
      maximizeChat();
    } else {
      minimizeChat();
    }
  }, [isMinimized, minimizeChat, maximizeChat]);

  // Refresh chat
  const refreshChat = useCallback(() => {
    setIsLoading(true);
    chatReadyRef.current = false;
    setError(null);
    
    // Clear storage and reset
    const cleared = clearFlowiseStorage();
    if (cleared) {
      // Force reload with new key
      setChatKey(Date.now());
      sessionIdRef.current = getSessionId();
      logChatEvent('chat_refreshed');
    } else {
      setError('Failed to refresh chat. Please try again.');
      setIsLoading(false);
    }
  }, []);

  // Handle errors
  const handleError = useCallback((errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
    logChatEvent('chat_error', { error: errorMessage });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get chat configuration
  const chatConfig = getChatConfig();

  // Mark as unread (for notifications)
  const markAsUnread = useCallback(() => {
    if (!isOpen) {
      setHasUnread(true);
      logChatEvent('chat_marked_unread');
    }
  }, [isOpen]);

  // Handle visibility change (tab focus/blur)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isOpen) {
        logChatEvent('chat_tab_hidden');
      } else if (!document.hidden && isOpen) {
        logChatEvent('chat_tab_visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isOpen]);

  // Auto mark as unread after inactivity
  useEffect(() => {
    if (!isOpen && !hasUnread) {
      const timer = setTimeout(() => {
        markAsUnread();
      }, 30000); // 30 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [isOpen, hasUnread, markAsUnread]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Escape to close
      if (event.key === 'Escape' && isOpen) {
        closeChat();
      }
      
      // Ctrl/Cmd + K to toggle chat
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        toggleChat();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeChat, toggleChat]);

  return {
    // State
    isLoading,
    isOpen,
    isMinimized,
    hasUnread,
    chatKey,
    error,
    sessionId: sessionIdRef.current,
    
    // Actions
    openChat,
    closeChat,
    toggleChat,
    minimizeChat,
    maximizeChat,
    toggleMinimize,
    refreshChat,
    handleChatReady,
    handleError,
    clearError,
    markAsUnread,
    
    // Configuration
    chatConfig,
    
    // Status
    isReady: chatReadyRef.current,
  };
};