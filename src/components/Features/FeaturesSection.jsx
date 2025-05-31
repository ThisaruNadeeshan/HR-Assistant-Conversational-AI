import React from "react";
import { motion } from "framer-motion";
import { features } from "../../data/features";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => (
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
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
