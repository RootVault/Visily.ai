import React from 'react';
import { Link } from 'react-router-dom';

const AlertBanner: React.FC = () => {
  return (
    <div className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700 rounded-md px-4 py-3 text-sm mx-auto max-w-4xl mt-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span>🎉 <strong>Mapi.ai v1.0</strong> is now open source!</span>
        <link
          href="https://github.com/usemapi/Mapi.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-blue-600 dark:hover:text-blue-300"
        >
          View on GitHub →
        </link>
      </div>
    </div>
  );
};

export default AlertBanner;
