import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Hero } from "../../components/HeroSection/Hero";
import Features from "../../components/FeatureSection/Features";

export const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};
