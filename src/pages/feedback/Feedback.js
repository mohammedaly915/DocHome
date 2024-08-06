import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Total from '../../component/feedback/Total';
import './feedback.scss';
import Rating from '../../component/feedback/Rating';
import { feedbackData } from '../../data'; // Assuming this is your data source
import { ArrowBackIos } from '@mui/icons-material';
import FeedbackPopup from './PopupFeed'; // Import FeedbackPopup component

const Feedback = () => {
  // Calculate average rating
  const totalStars = feedbackData.map(feedback => feedback.rating);
  const averageRating = totalStars.length > 0 ? (totalStars.reduce((a, b) => a + b) / totalStars.length).toFixed(1) : 0;

  // State for handling popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to handle submitting feedback
  const handleSubmitFeedback = (stars, comment) => {
    // Logic to handle submitting feedback
    console.log(`Stars: ${stars}, Comment: ${comment}`);
    // Close the popup
    setIsPopupOpen(false);
  };

  return (
    <section className='feedback-page'>
      <div className="feedback-box container">
        <Link to="" className="header">
          <ArrowBackIos />
          <h4 className='fw-bold'>Caregiver Reviews</h4>
        </Link>
        <div className='user-info'>
          <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='User' />
        </div>
        <div className='feedback-content'>
          <Total averageRating={averageRating} totalReviews={feedbackData.length} />
          <div className='ratings'>
            {feedbackData.map(feedback => (
              <Rating key={feedback.id} name={feedback.name} rating={feedback.rating} date={feedback.date} comment={feedback.comment} />
            ))}
          </div>
        </div>
        <button className="open-popup-btn" onClick={togglePopup}>Leave Feedback</button>
        <FeedbackPopup isOpen={isPopupOpen} onClose={togglePopup} onSubmit={handleSubmitFeedback} />
      </div>
    </section>
  );
}

export default Feedback;
