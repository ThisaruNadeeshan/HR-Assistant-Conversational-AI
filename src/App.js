import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingChatButton from './components/Chat/FloatingChatButton';
import ChatModal from './components/Chat/ChatModal';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <div className="landing-page">
          <HomePage toggleChat={toggleChat} />
        </div>
      </AnimatePresence>

      <AnimatePresence>
        {!isChatOpen && <FloatingChatButton onClick={toggleChat} />}
        {isChatOpen && <ChatModal onClose={toggleChat} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
