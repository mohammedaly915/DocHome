import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse mt-16">
      <div className="flex justify-between items-center p-4 bg-gray-200 rounded-md">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="mt-4 space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-4 bg-gray-200 rounded-md">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
