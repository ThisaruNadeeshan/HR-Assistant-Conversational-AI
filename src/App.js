import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingChatButton from './components/Chat/FloatingChatButton';
import ChatModal from './components/Chat/ChatModal';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(true);

  // Handle chat toggle
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    // Clear unread indicator when opening chat
    if (!isChatOpen) {
      setHasUnreadMessage(false);
    }
  };

  // Handle chat close
  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isChatOpen) {
        handleCloseChat();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isChatOpen]);

  // Simulate periodic unread messages (optional)
  useEffect(() => {
    if (!isChatOpen) {
      const timer = setTimeout(() => {
        setHasUnreadMessage(true);
      }, 30000); // Show notification after 30 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  return (
    <div className="app flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        <div className="landing-page flex-grow">
          <HomePage toggleChat={toggleChat} />
        </div>
      </AnimatePresence>

      <AnimatePresence>
        {!isChatOpen && (
          <FloatingChatButton 
            onClick={toggleChat} 
            hasUnread={hasUnreadMessage}
          />
        )}
        {isChatOpen && (
          <ChatModal 
            onClose={handleCloseChat}
            onMinimize={() => setIsChatOpen(false)}
          />
        )}
      </AnimatePresence>

      <Footer toggleChat={toggleChat} />
    </div>
  );
};

export default App;