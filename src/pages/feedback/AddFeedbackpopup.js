import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../../component/Popup/SuccessPopup'; // Import SuccessPopup component
import './FeedbackPopup.scss';

const AddFeedbackPopup = ({ isOpen, onClose, userImage, userName }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0); // State for managing rating
  const [hoverRating, setHoverRating] = useState(0); // State for managing hover rating
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success popup
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send feedback to server)
    console.log('User Name:', userName);
    console.log('Feedback Text:', feedbackText);
    console.log('Rating:', rating);
    setShowSuccess(true); // Show success popup
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="add-feedback-popup-overlay">
        <div className="add-service-popup" ref={popupRef}>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="services-title">Caregiver Review</h2>
          <div className="user-info">
            <img src={userImage} alt="User" className="user-image" />
            <h3 className="user-name">{userName}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div className="rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className={`star ${ratingValue <= (hoverRating || rating) ? 'gold' : 'border'}`}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="feedback">Feedback</label>
              <textarea
                id="feedback"
                value={feedbackText}
                onChange={handleFeedbackChange}
                placeholder="Enter your feedback"
                rows={5}
                style={{ resize: 'none' }} // Prevent textarea resize
                required
              />
            </div>
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      </div>
      <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
};

export default AddFeedbackPopup;
