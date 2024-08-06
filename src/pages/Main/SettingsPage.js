import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../component/footer/fullLogo.png';
import './setting.scss';
import Region from '../Auth/Region';
import axios from 'axios';

const SettingsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  const navigate = useNavigate();
 
  const userId = 1; // Assume user ID is available

  const handleRegionUpdate = async (region) => {
    setSelectedRegion(region);

    try {
      const response = await axios.put(`http://localhost:3001/users/${userId}`, {
        center_id: region.id,
      });

      console.log('Location updated successfully', response.data);
      navigate('/settings');
    } catch (error) {
      console.error('Failed to update location', error);
    }
  };
  console.log(selectedRegion);

  return (
    <div className="p-6  ml-[250px] w-[calc(100% - 250px)] min-h-[calc(100vh-100px)]">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-[#376B95] min-h-[80vh]">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Profile" className="w-16 h-16 rounded-full shadow-lg mb-4" />
          <h2 className="text-xl font-bold mb-4">User Name</h2>
          <h1 className="text-3xl font-bold text-[#376B95] mb-6">Settings</h1>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <div className="mb-6 w-80">
                  <label className="block text-gray-700 mb-2">Change Language</label>
                  <select className="w-full p-3 border border-[#376B95] rounded">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="mb-6 w-80 flex items-center justify-between border border-[#376B95] rounded ">
                  <label className="text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Change Location
                  </label>
                  <Link
                    to="region"
                    className="p-3 border border-[#376B95] rounded bg-[#376B95] text-white hover:bg-[#27597d] flex items-center"
                  >
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="region" element={<Region onRegionUpdate={handleRegionUpdate} />} />
        </Routes>
        <div className="mt-6">
          <button className="w-100 p-3 bg-white text-[#376B95] border border-red-500 rounded hover:bg-red-500 hover:text-white">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
