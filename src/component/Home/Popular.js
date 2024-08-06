import React, { useContext } from 'react';
import PopularItem from './PopularItem';
import { useFetch } from '../../hooks/useFetch';
import { AuthContext } from '../../AuthContext/AuthContext';

const Popular = () => {
  const {user} =useContext(AuthContext)
  const patient =user? user.data :null;
  const { data: caregivers, loading, error } = useFetch(`http://localhost:4000/caregivers?center_id=${patient.user.region_id}`); // Adjust URL as per your JSON server

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching caregivers: {error.message}</div>;

  return (
    <section id="MostPopularCaregiver" className="popularCaregiver">
      <div className="container">
        <h2 className="fw-bolder text-center pt-2">Nearest caregivers</h2>
        <p className="text-muted lead text-center mx-auto">
          Nearest caregivers are available for your needs.
        </p>
        <div className="footerline w-25 bg-light mx-auto pt-1 mb-4"></div>
      </div>
      <div className="wrapper">
        <div className="rows">
          {caregivers.map(caregiver => (
            <PopularItem key={caregiver.id} caregiver={caregiver} user={patient? patient.user :null}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
