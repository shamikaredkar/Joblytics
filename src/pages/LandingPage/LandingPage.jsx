import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Hero } from "../../components/HeroSection/Hero";
import Features from "../../components/FeatureSection/Features";
import { Footer } from "../../components/Footer/Footer";
import { Dashboard } from "../Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";

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
