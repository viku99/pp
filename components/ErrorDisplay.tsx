import React from 'react';
import { motion } from 'framer-motion';

interface ErrorDisplayProps {
  title: string;
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-red-500">{title}</h1>
        <p className="text-neutral-400 mt-2 mb-8">{message}</p>
        <button
          onClick={onRetry}
          className="group inline-flex items-center justify-center px-8 py-3 border border-neutral-600 text-neutral-300 uppercase text-sm tracking-widest transition-colors duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-white"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorDisplay;