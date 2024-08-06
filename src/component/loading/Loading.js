import React from 'react';
import logo from '../footer/logo1Dochome.png'; // Replace with your actual logo path

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen mt-20">
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-20 w-20 mb-4 animate-spin-slow"
        />
        <div className="rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
