import React, { useEffect, useState } from 'react';
import DoctorItem from '../../component/DoctorItem/DoctorItem';
import './Doctor.scss';
import ToggleOn from '@mui/icons-material/ToggleOn';
import ToggleOff from '@mui/icons-material/ToggleOff';
import Loading from '../../component/loading/Loading';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
 
const Doctor = ({setsidebar}) => {
  const { data, loading, error } = useFetch('http://localhost:4000/caregivers');

  const [filter, setFilter] = useState('all');
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (data) {
      if (filter === 'active') {
        setFilteredCaregivers(data.filter((caregiver) => caregiver.open === true));
      } else {
        setFilteredCaregivers(data);
      }
    }
  }, [filter, data]);

  const handleToggle = () => {
    setFilter((prevFilter) => (prevFilter === 'all' ? 'active' : 'all'));
  };

    // Function to handle navigation to Service component
  const handleDoctorClick = (caregiver) => {
      setsidebar(false)
      
      navigate(`service`, {state: { caregiver_id: caregiver.id, category_id: caregiver.category_id },});
    };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="doctor-page">
      <div className="filter-icon">
        {filter === 'all' ? (
          <div className="toggle-container" onClick={handleToggle}>
            <span>All Caregivers</span>
            <ToggleOff className="toggle-icon" />
          </div>
        ) : (
          <div className="toggle-container active" onClick={handleToggle}>
            <h3>Active Caregivers</h3>
            <ToggleOn className="toggle-icon active" />
          </div>
        )} 
      </div>

      <div className="doctors">
        <div className="doctor-content">
          {filteredCaregivers.map((caregiver) => (
            <DoctorItem key={caregiver.id} caregiver={caregiver} handleDoctorClick={()=>handleDoctorClick(caregiver)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
