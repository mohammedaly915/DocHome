import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import DoctorItem from '../../component/DoctorItem/DoctorItem';
import { useFetch } from '../../hooks/useFetch';
import { ArrowBackIos, ToggleOff, ToggleOn } from '@mui/icons-material';
import './caregiver.scss';

const Caregiver = () => {
  const location = useLocation();
  const { category_id } = location.state || { category_id: null };
  const { data: doctors, loading, error } = useFetch(`http://localhost:4000/caregivers?category_id=${category_id}`);


  const [filter, setFilter] = useState('all');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();
  console.log(doctors);
  useEffect(() => {
    if (doctors) {
      if (filter === 'active') {
        setFilteredDoctors(doctors.filter((caregiver) => caregiver.open === true));
      } else {
        setFilteredDoctors(doctors);
      }    }
  }, [filter, doctors]);
console.log(filteredDoctors);

  const handleDoctorClick = (doctor) => {
    navigate(`/category/stuff/service`,{state: {category_id,caregiver_id: doctor.id }});
  };

  const handleToggle = () => {
    setFilter((prevFilter) => (prevFilter === 'all' ? 'active' : 'all'));
  };

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <section id='caregiver' className='caregiver-page py-5 mt-5 bg-light'>
      <div className="caregiver-box container bg-white rounded-3xl shadow p-4">
        <Link to="/" className="back-link d-flex align-items-center mb-5">
          <ArrowBackIos />
          <h2 className='fw-bolder'>Caregiver Staff</h2>
        </Link>
        <div className='filter-icon'>
      {filter === 'all' ? (
        <>
          <span>All Caregivers</span>
          <ToggleOff onClick={handleToggle} className='toggle-icon' />
        </>
      ) : (
        <>
          <span>Active Caregivers</span>
          <ToggleOn onClick={handleToggle} className='toggle-icon active' />
        </>
      )}
    </div>
        <div className='caregivers'>
          {filteredDoctors.map((doctor) => (
            <DoctorItem
              key={doctor.id}
              caregiver={doctor}
              handleDoctorClick={() => handleDoctorClick(doctor)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Caregiver;
