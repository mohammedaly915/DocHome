import React, { useState, useEffect } from 'react';
import './doctorchec.scss';
import { FaStar ,FaRegStar ,FaRegStarHalfStroke } from "react-icons/fa6";
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import ChatBubble from '@mui/icons-material/ChatBubble';
import Lock from '@mui/icons-material/Lock';
import Cancel from '@mui/icons-material/Cancel';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import AddFeedbackPopup from '../feedback/AddFeedbackpopup';
import BookingConfirmationPopup from '../../component/Popup/Confirmbook'; // Import the booking confirmation popup component
import { FaStarHalfAlt } from 'react-icons/fa';

const DoctorChec = ({user}) => {
  const location = useLocation();
  const { selectedItems: initialSelectedItems, caregiver_id } = location.state || { selectedItems: [], id: null };
  const { data: caregiverData, loading: caregiverLoading, error: caregiverError } = useFetch(`http://localhost:4000/caregivers/${caregiver_id}`);
  const { data: servicesData, loading: servicesLoading, error: servicesError } = useFetch('http://localhost:4000/services');  
  const { data: bookingsData, loading: bookingsLoading, error: bookingsError } = useFetch(`http://localhost:4000/bookings?user_id=${user.id}`);

  console.log(caregiver_id);
  console.log(caregiverData);

  const [chatOpen, setChatOpen] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false); // State to control booking popup
  const [canAddReview, setCanAddReview] = useState(false);

  const doctor = servicesData && caregiver_id && servicesData.find(service => service.id === caregiver_id);
  console.log(user);
  
  useEffect(() => {
    if (bookingsData && caregiverData) {
      const hasBookingWithCaregiver = bookingsData.some(booking => booking.caregiver_id === caregiverData.id);
      setCanAddReview(hasBookingWithCaregiver);
      setHasSubscription(hasBookingWithCaregiver);
    }
  }, [bookingsData, caregiverData]);

  const calculateTotalPrice = () => {
    if (!selectedItems || selectedItems.length === 0) return 0;
    return selectedItems.reduce((total, service) => total + service.price, 0);
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) return 'Price not available';
    return `$${price.toFixed(2)}`;
  };

  const renderAllServices = () => {
    if (!doctor || !doctor.services) return null;
    return (
      <div className='doctor_specs'>
        <h3>All services</h3>
        <div className='specs'>
          {doctor.services.map((service) => (
            <p key={service.id}>{service.name_ar}</p>
          ))}
        </div>
      </div>
    );
  };

  const renderSelectedServices = () => {
    if (!selectedItems || !servicesData) return null;
    return (
      <div className='selected_services'>
        <h3>Selected services</h3>
        {selectedItems.map((service, index) => (
          <div className='servise' key={index}>
            <p className='serve'>{service.name_ar}</p>
            <div className='end'>
              <p className='price'>{formatPrice(service.price)}</p>
              <Cancel className='remove_icon' onClick={() => removeService(index)} />
            </div>
          </div>
        ))}
        <div className='totals servise'>
          <p className='total serve'>Total</p>
          <p className='price'>{formatPrice(calculateTotalPrice())}</p>
        </div>
      </div>
    );
  };

  const removeService = (index) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleAppointment = () => {
    setShowBookingPopup(true); // Show booking popup
  };

  const toggleChat = () => {
    if (hasSubscription) {
      setChatOpen((prev) => !prev);
    } else {
      alert('make at least 1 book.');
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className='stars'>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className='star' />
        ))}
        {halfStars === 1 && <FaStarHalfAlt className='star' />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className='star' />
        ))}
      </div>
    );
  };

  const handleAddFeedback = () => {
    if (canAddReview) {
      setShowFeedbackPopup(true);
    } else {
      alert('You need to have at least one booking to add a review.');
    }
  };

  const handleConfirmBooking = (date, time) => {
    alert(`Appointment booked for ${date} at ${time}!`);
    setShowBookingPopup(false); // Close booking popup
  };



  if (caregiverLoading||servicesLoading) return <p>Loading...</p>;
  if (caregiverError||servicesError) return <p>{caregiverError.message||servicesError.message}</p>;

  return (
    <div className='chec_page'>
      <div className='chec_box'>
        <div className='doctor_info'>
          <img
            src={caregiverData.profile_image}
            alt=''
          />
          <div className='doc_name'>
            <h3>DR / {caregiverData.name}</h3>
            <div className='doc_rate'>
              {renderStars(caregiverData.stars)}
              <div className='digits'>{`${caregiverData.stars} | ${caregiverData.number_of_reviews} reviews`}</div>
            </div>
            <p className='summary'>
                {caregiverData.about}
            </p>
            <div className='doc_reveiw'>
              <div className='reveiws rev'>Reviews</div>
              <div className='add_reveiw rev' onClick={handleAddFeedback}>Add review</div>
            </div>
          </div>
          <button className='chat_icon' onClick={toggleChat}>
            Chat
            {hasSubscription ? (
              chatOpen ? (
                <ChatBubble />
              ) : (
                <ChatBubbleOutline />
              )
            ) : (
              <Lock />
            )}
          </button>
        </div>
        {renderAllServices()}
        {renderSelectedServices()}
        <div onClick={handleAppointment} className='appionment_btn'>
          Make book
        </div>
      </div>

      {/* Feedback Popup */}
      {showFeedbackPopup && (
        <AddFeedbackPopup
          isOpen={showFeedbackPopup}
          onClose={() => setShowFeedbackPopup(false)}
        />
      )}

      {/* Booking Confirmation Popup */}
      {showBookingPopup && (
        <BookingConfirmationPopup
          isOpen={showBookingPopup}
          onClose={() => setShowBookingPopup(false)}
          doctor={caregiverData}
          user={user}
          services={selectedItems}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default DoctorChec;
