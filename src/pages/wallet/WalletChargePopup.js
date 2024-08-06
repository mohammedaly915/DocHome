// WalletChargePopup.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEnvelope, faPhone, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const WalletChargePopup = ({ isOpen, onClose }) => {
  const [userData] = useState({
    email: 'user@example.com', // Default email for display
    phone: '123-456-7890',     // Default phone for display
  });
  const [amount, setAmount] = useState(''); // State to hold the amount to charge

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate amount (optional)
    if (amount <= 0) {
      alert('Please enter a valid amount to charge.');
      return;
    }
    // Handle form submission logic (e.g., send data to backend)
    console.log('Charging data for user:', userData);
    console.log('Amount:', amount);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg relative transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <button className="absolute top-4 right-4 focus:outline-none" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="text-gray-600 hover:text-red-500 transition duration-200" />
        </button>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Charge Patient Balance</h2>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500">User Email</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
            <p className="text-lg text-gray-900">{userData.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500">User Phone</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
            <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
            <p className="text-lg text-gray-900">{userData.phone}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500">Amount to Charge</label>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faDollarSign} className="text-gray-500 mr-2" />
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
                placeholder="Enter amount to charge"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletChargePopup;
