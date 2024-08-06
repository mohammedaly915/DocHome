import React, { useState, useEffect } from 'react';
import './caregiverProfile.scss';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import ChatBubble from '@mui/icons-material/ChatBubble';
import Lock from '@mui/icons-material/Lock';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import AddFeedbackPopup from '../../pages/feedback/AddFeedbackpopup';

const CaregiverProfile = ({ user }) => {
  const location = useLocation();
  const { caregiver_id } = location.state || { caregiver_id: null };

  const { data: caregiverData, loading: caregiverLoading, error: caregiverError } = useFetch(`http://localhost:4000/caregivers/${caregiver_id}`);
  const { data: servicesData, loading: servicesLoading, error: servicesError } = useFetch(`http://localhost:4000/services?category_id=${caregiverData && caregiverData.category_id}`);
  const { data: bookingsData, loading: bookingsLoading, error: bookingsError } = useFetch(`http://localhost:4000/bookings?user_id=${user.id}`);
  const { data: feedbackData, loading: feedbackLoading, error: feedbackError } = useFetch(`http://localhost:4000/feedback?caregiver_id=${caregiver_id}`);

  const [chatOpen, setChatOpen] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [canAddReview, setCanAddReview] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (bookingsData && caregiverData) {
      const hasBookingWithCaregiver = bookingsData.some(booking => booking.caregiver_id === caregiverData.id);
      setCanAddReview(hasBookingWithCaregiver);
      setHasSubscription(hasBookingWithCaregiver);
    }
  }, [bookingsData, caregiverData]);

  const renderAllServices = () => (
    <div className='doctor_specs'>
      <h3>All Services</h3>
      <div className='specs'>
        {servicesData.map((service) => (
          <p key={service.id}>{service.name_ar}</p>))
        }
      </div>
    </div>
  );

  const toggleChat = () => {
    if (hasSubscription) {
      setChatOpen((prev) => !prev);
    } else {
      alert('Make at least 1 book.');
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

  const handleBookService = () => {
    navigate('/category/stuff/service/*', { state: { caregiver_id: caregiver_id, category_id: caregiverData.category_id } });
  };

  if (caregiverLoading || servicesLoading) return <p>Loading...</p>;
  if (caregiverError || servicesError) return <p>{caregiverError.message || servicesError.message}</p>;

  const userFeedback = feedbackData && feedbackData.find(feedback => feedback.user_id === user.id);

  return (
    <div className='caregiver_profile'>
      <div className='caregiver_box'>
        <div className='doctor_info'>
          <img src={caregiverData.profile_image} alt='' />
          <div className='doc_name'>
            <div className='top'>
              <h3>DR / {caregiverData.name}</h3>
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
            <div className='doc_rate'>
              {renderStars(caregiverData.stars)}
              <div className='digits'>{`${caregiverData.stars} | ${caregiverData.number_of_reviews} reviews`}</div>
            </div>
            <p className='summary'>{caregiverData.about}</p>
            <div className='btn'>
              <button className='appointment_btn' onClick={handleBookService}>
                Book Service
              </button>
              <button className='appointment_btn' onClick={handleAddFeedback}>
                Add feedback
              </button>
            </div>
          </div>
        </div>

        {renderAllServices()}

        <div className='feedback_section'>
          <h3>Feedback and Comments</h3>
          {userFeedback && (
            <div key={userFeedback.id} className='feedback_item user_feedback'>
              <div className='user_info'>
                <img src={userFeedback.user_image} alt={userFeedback.user_name} />
                <p>You</p>
              </div>
              <div className='comment_section'>
                <p>{userFeedback.comment}</p>
                <div className='stars'>{renderStars(userFeedback.rating)}</div>
              </div>
            </div>
          )}
          {/* .filter(feedback => feedback.user_id !== user.id) */}
          {feedbackData && feedbackData.length > 0 ? (
            feedbackData
              .map((feedback) => (
                <div key={feedback.id} className='feedback_item'>
                  <div className='user_info'>
                    <img src={feedback.user_image} alt={feedback.user_name} />
                    <p>Muhammed Aly</p>
                  </div>
                  <div className='comment_section'>
                    <p>{feedback.comment}</p>
                    <div className='stars'>{renderStars(feedback.rating)}</div>
                  </div>
                </div>
              ))
          ) : (
            <p>No feedback available.</p>
          )}
        </div>
      </div>

      {showFeedbackPopup && (
        <AddFeedbackPopup isOpen={showFeedbackPopup} onClose={() => setShowFeedbackPopup(false)} />
      )}
    </div>
  );
};

export default CaregiverProfile;
