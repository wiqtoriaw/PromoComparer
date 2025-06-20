import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function HomePage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <HeroSection />
      <FeatureSection />
    </motion.div>
  );
}
