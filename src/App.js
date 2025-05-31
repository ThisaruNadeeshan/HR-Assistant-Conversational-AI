import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Bot, Users, Zap, Shield } from 'lucide-react';
import { FullPageChat } from 'flowise-embed-react';
import './App.css';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Conversations",
      description: "Experience intelligent responses powered by advanced AI technology"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get instant responses to your questions with minimal latency"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Available",
      description: "Your AI assistant is always ready to help, anytime, anywhere"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your conversations are protected with enterprise-grade security"
    }
  ];

  return (
    <div className="app">
      {/* Main Landing Page */}
      <motion.div 
        className="landing-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-background"></div>
          <div className="hero-content">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hero-text"
            >
              <div className="hero-badge">
                <Sparkles className="w-4 h-4" />
                <span>Powered by AI</span>
              </div>
              <h1 className="hero-title">
                Meet Your New
                <span className="gradient-text"> AI Assistant</span>
              </h1>
              <p className="hero-description">
                Experience the future of conversation with our intelligent chatbot. 
                Get instant answers, creative solutions, and personalized assistance 
                whenever you need it.
              </p>
              <motion.button
                className="cta-button"
                onClick={toggleChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MessageCircle className="w-5 h-5" />
                Start Chatting Now
              </motion.button>
            </motion.div>
            
            <motion.div
              className="hero-visual"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="chat-preview">
                <div className="chat-header">
                  <div className="chat-avatar"></div>
                  <div className="chat-info">
                    <div className="chat-name">AI Assistant</div>
                    <div className="chat-status">Online</div>
                  </div>
                </div>
                <div className="chat-messages">
                  <motion.div 
                    className="message bot-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    Hello! How can I help you today?
                  </motion.div>
                  <motion.div 
                    className="message user-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    What can you do?
                  </motion.div>
                  <motion.div 
                    className="message bot-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    I can help with questions, creative tasks, problem-solving, and much more! ✨
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="features-header"
            >
              <h2>Why Choose Our AI Assistant?</h2>
              <p>Discover the power of intelligent conversation</p>
            </motion.div>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="cta-content"
            >
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of users who are already experiencing the future of AI assistance</p>
              <motion.button
                className="cta-button large"
                onClick={toggleChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6" />
                Try It Now - It's Free
              </motion.button>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            className="floating-chat-button"
            onClick={toggleChat}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <MessageCircle className="w-6 h-6" />
            <div className="chat-notification">
              <div className="notification-dot"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
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
                <button className="close-button" onClick={toggleChat}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="chat-content">
                <FullPageChat
                  chatflowid="203f516c-89c9-4acb-8277-b06189893183"
                  apiHost="https://cloud.flowiseai.com"
                  chatflowConfig={{}}
                  observersConfig={{}}
                  theme={{
                    button: {
                      backgroundColor: '#6366f1',
                      right: 20,
                      bottom: 20,
                      size: 48,
                      dragAndDrop: false,
                      iconColor: 'white',
                      autoWindowOpen: {
                        autoOpen: false,
                        openDelay: 0,
                        autoOpenOnMobile: false
                      }
                    },
                    tooltip: {
                      showTooltip: false
                    },
                    disclaimer: {
                      title: 'Welcome to AI Assistant',
                      message: "Ready to help you with any questions or tasks!",
                      textColor: '#374151',
                      buttonColor: '#6366f1',
                      buttonText: 'Start Chatting',
                      buttonTextColor: 'white',
                      blurredBackgroundColor: 'rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'white'
                    },
                    chatWindow: {
                      showTitle: false,
                      showAgentMessages: true,
                      welcomeMessage: 'Hello! I\'m your AI assistant. How can I help you today?',
                      errorMessage: 'Sorry, something went wrong. Please try again.',
                      backgroundColor: '#ffffff',
                      height: '100%',
                      width: '100%',
                      fontSize: 14,
                      starterPrompts: [
                        "What can you help me with?",
                        "Tell me about yourself",
                        "How do I get started?"
                      ],
                      starterPromptFontSize: 13,
                      clearChatOnReload: false,
                      sourceDocsTitle: 'Sources:',
                      renderHTML: true,
                      botMessage: {
                        backgroundColor: '#f8fafc',
                        textColor: '#374151',
                        showAvatar: true,
                        avatarSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+'
                      },
                      userMessage: {
                        backgroundColor: '#6366f1',
                        textColor: '#ffffff',
                        showAvatar: true,
                        avatarSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMxMGI5ODEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxVjE5QTQgNCAwIDAgMCAxNiAxNUg4QTQgNCAwIDAgMCA0IDE5VjIxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4='
                      },
                      textInput: {
                        placeholder: 'Type your message...',
                        backgroundColor: '#ffffff',
                        textColor: '#374151',
                        sendButtonColor: '#6366f1',
                        maxChars: 1000,
                        autoFocus: true,
                        sendMessageSound: false,
                        receiveMessageSound: false
                      },
                      feedback: {
                        color: '#6b7280'
                      },
                      dateTimeToggle: {
                        date: false,
                        time: false
                      },
                      footer: {
                        textColor: '#9ca3af',
                        text: 'Powered by',
                        company: 'Flowise AI',
                        companyLink: 'https://flowiseai.com'
                      }
                    }
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;