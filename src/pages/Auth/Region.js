import React, { useState, useEffect } from 'react';
import CustomSelect from '../../component/customSelect/CustomSelect';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFetch } from '../../hooks/useFetch';
import './Auth.scss'
const Region = ({ onRegionUpdate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: regions, loading: center_loading, error: center_error } = useFetch("http://localhost:4000/Regions");
  // Extract user data from location state or use default values
  const {
    Fname,
    Lname,
    userName,
    email,
    phone,
    password} = location.state || {};

  useEffect(() => {
    if (regions) {
      const defaultCenter = regions.find(center => center.id === regions.id);
      setSelectedRegion(defaultCenter);
    }
  }, [regions]);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRegion || !selectedRegion.id) {
      setError('Please select a region.');
      return;
    }

    if (onRegionUpdate) {
      onRegionUpdate(selectedRegion);
      return;
    }

    const fullUserData = {Fname,Lname,userName,email,password,region_id: selectedRegion.id };
    console.log(fullUserData);
    setLoading(true);
    try {
        // Register new user
        const res = await axios.post('http://localhost:5000/api/auth/register', fullUserData, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('User registered successfully', res);
        // navigate('/login');
    } catch (error) {
      setError('Failed to submit data.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="region">
      <div className="region-left">
        <span>DocHome</span>
      </div>
      <div className="region-right">
        <h1>Choose your region</h1>
        <p>Please choose your area to help us provide you with the best service</p>
        <form onSubmit={handleSubmit}>
          <CustomSelect centers={regions} loading={center_loading} error={center_error} onSelectChange={handleRegionChange} />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="button">
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Region;