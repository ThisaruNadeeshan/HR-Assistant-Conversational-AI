import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingChatButton from './components/Chat/FloatingChatButton';
import ChatModal from './components/Chat/ChatModal';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="app flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        <div className="landing-page flex-grow">
          <HomePage toggleChat={toggleChat} />
        </div>
      </AnimatePresence>

      <AnimatePresence>
        {!isChatOpen && <FloatingChatButton onClick={toggleChat} />}
        {isChatOpen && <ChatModal onClose={toggleChat} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default App;
