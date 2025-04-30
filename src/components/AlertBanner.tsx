import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="font-medium">
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

const AlertBanner: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto group">
      {/* Gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main banner content */}
      <div className="relative flex items-center justify-between gap-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Left section with icon and text */}
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shadow-inner">
            <Github className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300">
            <TypewriterText text="Mapi.ai v1.0 is now open source! 🎉" />
          </div>
        </div>

        {/* Right section with GitHub link */}
        <a
          href="https://github.com/usemapi/Mapi.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-300"
        >
          View on GitHub
          <svg
            className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AlertBanner;
