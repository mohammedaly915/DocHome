import { ArrowBackIos } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import { useFetch } from '../../hooks/useFetch';

const Service = () => {
  const location = useLocation();
  const { caregiver_id, category_id } = location.state || { id: null, category: null };
  const [selectedItems, setSelectedItems] = useState([]);
  const { data: services, loading, error } = useFetch(`http://localhost:4000/services?category_id=${category_id}`);
  const navigate = useNavigate();

  useEffect(() => {
    if (services && services.length > 0) {
      console.log(services);
    }
  }, [services]);

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  const handleContinue = () => {
    navigate(`appointment/`, { state: { selectedItems, caregiver_id } });
  };

  const handleClick = (service) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((item) => item !== service) // Remove if already selected
        : [...prevSelected, service] // Add to selected items
    );
  };

  return (
    <section id="services" className="min-h-screen flex justify-center items-center py-5 mt-5 bg-light">
      <div className="w-11/12 max-w-4xl bg-white rounded-3xl shadow p-6">
        <div className="flex items-center mb-5 p-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowBackIos className="mr-2 text-[#376B95]" />
          <h2 className="font-bold text-xl text-[#376B95]">Services Staff</h2>
        </div>
        <div className="flex flex-col gap-3">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                onClick={() => {handleClick(service)
                console.log(service)
                }}
                className={`p-2 border-2 rounded-xl cursor-pointer transition-all ${selectedItems.includes(service) ? 'bg-[#28343C] text-white border-gray-400' : 'bg-gray-100 border-gray-300'}`}
              >
                <p className="m-0 text-sm no-underline">{service.name_ar}</p>
              </div>
            ))
          ) : (
            <p>No services available.</p>
          )}
        </div>
        <button onClick={handleContinue} className="block w-1/2 text-center py-2 mt-5 bg-[#376B95] text-white rounded transition-all hover:bg-[#496B90] no-underline mx-auto">
          Continue
        </button>
      </div>
    </section>
  );
};

export default Service;
