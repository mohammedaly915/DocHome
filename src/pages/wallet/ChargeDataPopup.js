// WalletChargePopup.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const WalletChargePopup = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
  });
  const [amount, setAmount] = useState(''); // State to hold the amount to charge

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

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
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Charge Patient Balance</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter user email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User Phone</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter user phone"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount to Charge</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount to charge"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletChargePopup;
