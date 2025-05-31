import React from "react";
import HeroSection from "../components/Hero/HeroSection";
import FeaturesSection from "../components/Features/FeaturesSection";

const HomePage = ({ toggleChat }) => (
  <>
    <HeroSection toggleChat={toggleChat} />
    <FeaturesSection />
    {/* CTA Section can be added as a component if needed */}
  </>
);

export default HomePage;
