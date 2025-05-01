import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const messages = [
  'Mapi.ai v1.0 is now open source! 🎉',
  'Export your diagrams in PNG format! 📥',
];

const TypewriterText: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];

    if (!isDeleting && currentIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentMessage[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
    
    else if (!isDeleting && currentIndex === currentMessage.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
    
    else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
    
    else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }
  }, [currentIndex, isDeleting, currentMessageIndex]);

  return (
    <span className="font-medium">
      {displayText}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
};

const AlertBanner = () => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm">
        <svg 
          className="h-4 w-4 flex-shrink-0 text-blue-500 dark:text-blue-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <div className="text-sm">
          <TypewriterText />
        </div>
      </div>
    </div>
  );
};

export default AlertBanner; 
