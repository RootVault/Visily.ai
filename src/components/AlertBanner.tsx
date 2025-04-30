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

const AlertBanner = () => {
  return (
    <Link
      to="https://github.com/usemapi/Mapi.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-slate-900 shadow-lg rounded-full px-6 py-3 flex items-center justify-between gap-4 max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-2">
        <Github className="h-5 w-5" />
        <span>Mapi.ai v1.0 is now open source!</span>
        <span className="text-xl">🎉</span>
      </div>
      <span className="text-blue-600 dark:text-blue-400 flex items-center">
        View on GitHub
        <svg className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    </Link>
  );
};

export default AlertBanner; 