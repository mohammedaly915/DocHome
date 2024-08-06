import React from 'react';
import StarIcon from '@mui/icons-material/Star';
    
const Rating = ({ name, rating, date, comment }) => {
  const isEven = rating % 2 === 0; // Check if rating is even to determine background color

  return (
    <div className={`review ${isEven ? 'even' : 'odd'}`}>
      <div className='account'>
        <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
        <p>{name}</p>
      </div>
      <div className='rating'>
        <div className='stars'>
          {[...Array(rating)].map((_, index) => (
            <StarIcon key={index} className='star' />
          ))}
        </div>
        <div className='date'>{date}</div>
      </div>
      <div className='comment'>
        {comment}
      </div>
    </div>
  );
};

export default Rating;
