import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import WalletChargePopup from './WalletChargePopup'; // Import WalletChargePopup component
import { useFetch } from '../../hooks/useFetch'; // Import the custom useFetch hook

const Wallet = () => {
  const [patientBalance, setPatientBalance] = useState(0);
  const [processingBalance, setProcessingBalance] = useState(0);
  const [sentBalance, setSentBalance] = useState(0);
  const [showChargePopup, setShowChargePopup] = useState(false); // State for showing charge data popup

  const { data: wallets, loading, error } = useFetch('http://localhost:4000/wallets'); // Fetch wallet data

  useEffect(() => {
    if (wallets) {
      const totalPatientBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);
      setPatientBalance(totalPatientBalance);
      // Assuming processingBalance and sentBalance are part of the API response as separate fields
      // Adjust the below lines according to your actual API response structure
      // setProcessingBalance(response.data.processingBalance);
      // setSentBalance(response.data.sentBalance);
    }
  }, [wallets]);

  // Example function to open charge data popup
  const handleOpenChargePopup = () => {
    setShowChargePopup(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="p-6 mt-16 max-w-4xl mx-auto">
      {/* Card 1: Patient Balance */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faWallet} className="text-4xl text-blue-500 mr-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Patient Balance</h2>
        </div>
        <p className="text-lg text-gray-600">Current Balance: <span className="font-bold">${patientBalance.toFixed(2)}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 2: Processing Balance */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faClock} className="text-4xl text-yellow-500 mr-4" />
            <h2 className="text-xl font-semibold text-gray-800">Processing Balance</h2>
          </div>
          <p className="text-lg text-gray-600">In Process: <span className="font-bold">${processingBalance.toFixed(2)}</span></p>
        </div>

        {/* Card 3: Sent Balance */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-green-500 mr-4" />
            <h2 className="text-xl font-semibold text-gray-800">Sent to Caregiver</h2>
          </div>
          <p className="text-lg text-gray-600">Sent: <span className="font-bold">${sentBalance.toFixed(2)}</span></p>
        </div>
      </div>

      {/* Example: Button to add to processing */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleOpenChargePopup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
        >
          Charge Wallet
        </button>
      </div>

      {/* WalletChargePopup component */}
      <WalletChargePopup isOpen={showChargePopup} onClose={() => setShowChargePopup(false)} />
    </div>
  );
};

export default Wallet;
