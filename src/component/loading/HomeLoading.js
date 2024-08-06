import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const HomeLoading = () => {
  return (
    <div className="grid grid-rows-1 gap-4">
      {/* First section */}
      <div className="grid one grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="grid place-items-center bg-gray-200 p-4 animate-pulse">
            <FontAwesomeIcon className="sidebarIcon text-4xl text-gray-400" icon={faLayerGroup} />
            <h3 className="text-lg text-gray-600">Loading...</h3>
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        ))}
      </div>

      {/* Second section */}
      <div className="grid two grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="one bg-gray-200 p-4 md:col-span-2 lg:col-span-2 animate-pulse">
          <div className="h-20 bg-gray-300 mb-4"></div>
          <div className="h-20 bg-gray-300"></div>
        </div>
        <div className="two bg-gray-200 p-4 animate-pulse">
          <h2 className="text-lg text-gray-600 mb-4">Loading...</h2>
          <div className="h-40 bg-gray-300"></div>
        </div>
      </div>

      {/* Third section */}
      <div className="grid three grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        <div className="one bg-gray-200 p-4 animate-pulse">
          <div className="h-40 bg-gray-300"></div>
        </div>
        <div className="one bg-gray-200 p-4 animate-pulse">
          <div className="h-40 bg-gray-300"></div>
        </div>
      </div>

      {/* Fourth section */}
      <div className="h-screen mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-4 gap-4 h-5/6 mx-auto">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className={`bg-gray-200 rounded-lg p-4 animate-pulse ${idx === 4 ? 'col-span-2 md:col-span-2 row-span-1 md:row-span-2' : ''}`}>
              <span className="text-2xl text-gray-400">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;
