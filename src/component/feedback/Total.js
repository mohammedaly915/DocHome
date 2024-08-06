import React from 'react';
import StarIcon from '@mui/icons-material/Star';

const Total = ({ averageRating, totalReviews }) => {
  return (
    <div className='total-rating'>
      <p>Ratings and reviews are verified and are from real people who use the DocHome platform</p>
      <div className='rating'>
        <span className='rate'>{averageRating}</span>
        <div className='stars'>
          {[...Array(Math.floor(averageRating))].map((_, index) => (
            <StarIcon key={index} className='star' />
          ))}
        </div>
        <span className='reviews'>{totalReviews} reviews</span>
      </div>
    </div>
  );
};

export default Total;
