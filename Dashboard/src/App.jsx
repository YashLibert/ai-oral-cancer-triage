import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { GlobalStyles } from "./styles/GlobalStyles";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import StatsBand from "./sections/StatsBand";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import Dashboard from "./Dashboard";

function LandingPage({ onLaunch }) {
  return (
    <>
      <GlobalStyles />
      <Nav onLaunch={onLaunch} />
      <Hero onLaunch={onLaunch} />
      <StatsBand />
      <Features />
      <HowItWorks />
      <CTA onLaunch={onLaunch} />
      <Footer />
    </>
  );
}

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {showDashboard ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <Dashboard onBack={() => setShowDashboard(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onLaunch={() => setShowDashboard(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}