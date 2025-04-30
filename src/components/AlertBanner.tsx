import React from 'react';
import { Link } from 'react-router-dom';

const AlertBanner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-500 text-white text-center py-2 px-6 shadow-md">
      <span>🎉 Open Source - Mapi.ai v1.0 Launched! 🚀</span>
      <span> | </span>
      <Link
        to="https://github.com/usemapi/Mapi.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-200"
      >
        Check it out on GitHub
      </Link>
    </div>
  );
};

export default AlertBanner;
