import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Bot, Zap } from "lucide-react";
import ChatPreview from "./ChatPreview";

const HeroSection = ({ toggleChat }) => (
  <section className="hero">
    <div className="hero-background"></div>
    <div className="hero-content">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hero-text"
      >
        <motion.div 
          className="hero-badge"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Powered by GPT-4o & Flowise</span>
        </motion.div>
        
        <h1 className="hero-title">
          Meet Your 
          <span className="gradient-text"> Intelligent HR Assistant</span>
        </h1>
        
        <p className="hero-description">
          Experience seamless HR support with Iris AI - your 24/7 intelligent assistant for employee information, professional email generation, and HR workflows. Powered by advanced AI technology.
        </p>

        {/* Feature highlights */}
        <motion.div 
          className="hero-features"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            display: 'flex',
            gap: '2rem',
            margin: '2rem 0',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
            <Bot className="w-5 h-5" />
            <span>AI-Powered</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
            <Zap className="w-5 h-5" />
            <span>Instant Responses</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
            <MessageCircle className="w-5 h-5" />
            <span>Professional Emails</span>
          </div>
        </motion.div>

        <motion.button
          className="cta-button large"
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MessageCircle className="w-5 h-5" />
          Start Chatting with Iris AI
        </motion.button>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            marginTop: '2rem',
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.7)'
          }}
        >
          ✅ Secure & Confidential • ✅ 24/7 Available • ✅ Multilingual Support
        </motion.div>
      </motion.div>
      
      <ChatPreview />
    </div>
  </section>
);

export default HeroSection;