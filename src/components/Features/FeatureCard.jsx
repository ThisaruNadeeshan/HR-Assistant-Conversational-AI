import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ feature, index }) => (
  <motion.div
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
);

export default FeatureCard;
