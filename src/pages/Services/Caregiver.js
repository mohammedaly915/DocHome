import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DoctorItem from '../../component/DoctorItem/DoctorItem';
import { useFetch } from '../../hooks/useFetch';
import { ArrowBackIos, ToggleOff, ToggleOn } from '@mui/icons-material';
import Loading from '../../component/loading/Loading';

const Caregiver = () => {
  const location = useLocation();
  const { category_id } = location.state || { category_id: null };
  const { data: doctors, loading, error } = useFetch(`http://localhost:4000/doctor?category_id=${category_id}`);
  const [filter, setFilter] = useState('all');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors) {
      setFilteredDoctors(filter === 'active' ? doctors.filter((doctor) => doctor.status === 'Active') : doctors);
    }
  }, [filter, doctors]);

  const handleDoctorClick = (doctor) => {
    navigate({
      pathname: `/category/stuff`,
      state: { doctor_id: doctor.id }
    });
  };

  const handleToggle = () => {
    setFilter((prevFilter) => (prevFilter === 'all' ? 'active' : 'all'));
  };

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <section id='nursing' className='stuff-page py-5 mt-5 bg-light'>
      <div className="stuff-box container bg-white rounded rounded-3 shadow shadow-2 p-4  ">
        <Link to="/" className=" nursingtext d-flex  align-items-center mb-5 p-3">
          <ArrowBackIos />
          <h2 className='fw-bolder'>Nursing Stuff</h2>
        </Link>
        <div className='filter-icon'>
          {filter === 'all' ? (
            <ToggleOff onClick={handleToggle} className='toggle-icon' />
          ) : (
            <ToggleOn onClick={handleToggle} className='toggle-icon active' />
          )}
        </div>
        <div className='stuff'>
          {filteredDoctors.map((doctor) => (
            <DoctorItem
              key={doctor.id}
              doctor={doctor}
              handleDoctorClick={() => handleDoctorClick(doctor)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Caregiver;
