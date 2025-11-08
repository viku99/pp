import React from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const pathVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.42, 0, 0.58, 1], // easeInOutSine
    },
  },
};

const flareVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: [0, 1, 0],
    scale: [0.5, 1.2, 0],
    transition: {
      duration: 0.7,
      delay: 1, // Start the flare as the path is finishing
      ease: 'easeOut',
    },
  },
};

const glowVariants: Variants = {
  // Fix: Added `hidden` and `visible` states to align with the parent's animation lifecycle.
  // The 'rest' state was removed as it was redundant. Opacity is 0 for both initial states,
  // so the glow is only active on hover.
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0,
  },
  hover: {
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};


const AnimatedLogo: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative cursor-pointer"
      aria-label="Vikas Logo"
    >
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        aria-hidden="true"
        style={{ transformOrigin: 'center' }}
      >
        <defs>
          {/* A gradient to give the drawing stroke a "comet" effect */}
          <linearGradient id="comet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="80%" stopColor="rgba(255, 255, 255, 1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
          </linearGradient>
          
          {/* A blur filter for the hover glow and the flare */}
          <filter id="glow-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Pulsing glow effect on hover */}
        <motion.path
          d="M12 10 L25 38 L38 10"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow-blur)"
          variants={glowVariants}
          // Fix: Removed `initial="rest"` to allow the component to correctly inherit
          // the `initial="hidden"` and `animate="visible"` props from its parent container.
        />

        {/* The main drawing stroke */}
        <motion.path
          d="M12 10 L25 38 L38 10"
          stroke="url(#comet-gradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        
        {/* Completion flare effect */}
        <motion.circle
            cx="38"
            cy="10"
            r="4"
            fill="white"
            filter="url(#glow-blur)"
            variants={flareVariants}
        />
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;
