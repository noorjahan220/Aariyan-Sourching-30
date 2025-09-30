import React from 'react';

const WarningIcon = () => (
  <svg className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default function DownloadsContent() {
  return (
    <div>
      <div className="bg-gray-100 border border-gray-200 p-4 flex items-center mb-6">
        <WarningIcon />
        <p className="text-gray-700">No downloads available yet.</p>
      </div>
      <button className="bg-gray-800 text-white font-semibold px-6 py-2.5 hover:bg-gray-700 transition-colors">
        Browse products
      </button>
    </div>
  );
}