import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Hero } from "../../components/HeroSection/Hero";
import Features from "../../components/FeatureSection/Features";
import { Footer } from "../../components/Footer/Footer";

export const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};
