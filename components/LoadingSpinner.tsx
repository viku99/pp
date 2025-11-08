import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <motion.div
      style={{
        width: 50,
        height: 50,
        border: '5px solid rgba(255, 255, 255, 0.2)',
        borderTop: '5px solid white',
        borderRadius: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{
        // Fix: The 'loop' property does not exist on the transition type. It should be 'repeat'.
        repeat: Infinity,
        ease: "linear",
        duration: 1,
      }}
    />
  </div>
);

export default LoadingSpinner;
