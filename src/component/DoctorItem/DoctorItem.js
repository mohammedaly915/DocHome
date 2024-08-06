import React, { useEffect, useState } from 'react';
import Bookmark from '@mui/icons-material/Bookmark';
import Star from '@mui/icons-material/Star';
import './DoctorItem.scss';
import { useNavigate } from 'react-router-dom'; 
import { useFetch } from '../../hooks/useFetch';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { FaStarHalfAlt } from 'react-icons/fa';

const DoctorItem = ({ caregiver, handleDoctorClick}) => {
  
  const { data: categories } = useFetch(`http://localhost:4000/categories?id=${caregiver.category_id}`); // Fetch categories data
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [category, setCategory] = useState();

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0]); // Assume the category response is an array and get the first item
    }
  }, [categories]);
  const handleBookmarkClick = (event) => {
    event.stopPropagation(); // Prevent the event from propagating to the parent div
    setBookmarked((prevBookmarked) => !prevBookmarked);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className='icons'>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className='icon' />
        ))}
        {halfStars === 1 && <FaStarHalfAlt className='icon' />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className='icon' />
        ))}
      </div>
    );
  };

  if (!caregiver) {
    return null; // Handle case where caregiver prop is not yet available
  }

  return (
    <div className='doctor-item' onClick={handleDoctorClick}>
      <img src={caregiver.profile_image} alt={caregiver.name} />
      <div className='doctor-info'>
        <div className='name'>
          <h3 className='title'>Dr / {caregiver.name}</h3>
          <p className='department'>
            Department: {category && category.name_ar ? category.name_ar : 'N/A'}
          </p>  {/* Display category_id for now */}
        </div>
        <div className='rate'>
          {renderStars(caregiver.stars)}
          <div className='score'>
            <span>{caregiver.stars}</span>
            <span> | </span>
            <span>{caregiver.number_of_reviews} reviews</span>
          </div>
        </div>
      </div>
      <div className='status'>
        <Bookmark onClick={handleBookmarkClick} className={`bookmark ${bookmarked ? 'marked' : 'unmarked'}`} />
        <p className={`${caregiver.open === false ? 'inactive' : 'active'}`}>{caregiver.open? 'Active' : 'Inactive'}</p>

      </div>
    </div>
  );
};

export default DoctorItem;