import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const AlertBanner = () => {
  return (
    <Link
      to="https://github.com/usemapi/Mapi.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-slate-900 shadow-lg rounded-full px-3 py-1.5 inline-flex items-center w-fit mx-auto hover:shadow-xl transition-shadow duration-300"
    >
      <Github className="h-4 w-4 mr-1.5" />
      <span className="text-sm mr-1.5">Mapi.ai v1.0 is now open source!</span>
      <span className="text-base mr-2">🎉</span>
      <span className="text-blue-600 dark:text-blue-400 text-sm inline-flex items-center">
        View on GitHub
        <svg className="w-4 h-4 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    </Link>
  );
};

export default AlertBanner; 