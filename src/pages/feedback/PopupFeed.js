import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

const FeedbackPopup = ({ isOpen, onClose, onSubmit }) => {
  const [hoverStars, setHoverStars] = useState(0); // State for hovered stars

  // Function to handle hovering over stars in the popup
  const handleHover = (starCount) => {
    setHoverStars(starCount);
  };

  // Function to handle mouse leaving the star rating area
  const handleHoverLeave = () => {
    setHoverStars(0);
  };

  // Function to handle clicking on stars in the popup
  const handleClick = (selectedStars) => {
    // Perform action when stars are clicked (e.g., update state)
    onSubmit(selectedStars);
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`star ${index < hoverStars ? 'active' : ''}`}
              onMouseEnter={() => handleHover(index + 1)}
              onMouseLeave={handleHoverLeave}
              onClick={() => handleClick(index + 1)}
            />
          ))}
        </div>
        <textarea className="feedback-comment" placeholder="Write your feedback..." />
        <button className="submit-feedback-btn">Submit</button>
        <button className="close-popup-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FeedbackPopup;
