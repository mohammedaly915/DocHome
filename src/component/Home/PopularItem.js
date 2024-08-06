import React, { useEffect, useState } from 'react';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

const PopularItem = ({ caregiver ,user}) => {
  const { data: categories } = useFetch(`http://localhost:4000/categories?id=${caregiver.category_id}`); // Fetch categories data
  const [category, setCategory] = useState();
  const navigate=useNavigate()
  const stars = caregiver.stars !== undefined && caregiver.stars !== null ? caregiver.stars : 0;
  const numberOfReviews = caregiver.number_of_reviews !== undefined && caregiver.number_of_reviews !== null ? caregiver.number_of_reviews : 0;
  
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0]); // Assume the category response is an array and get the first item
    }
  }, [categories]);

  const handleBtnClick=(e)=>{
    console.log(caregiver.id);
    navigate('/caregiver/profile',{state:{caregiver_id:caregiver.id},})
  }
  return (
    <div className="p-2 popularItem">
      <img className=" d-block mx-auto" src={caregiver.profile_image} alt={`${caregiver.name}'s profile`} />
      <h5 className="fw-bold text-center">{caregiver.name}</h5>
      <p className="text-muted lead text-center">{category && category.name_ar ? category.name_ar : 'N/A'}</p>
      <div className="review">
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              {index < Math.floor(stars) ? (
                <Star className="star" />
              ) : (
                <StarOutline className="star" />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="comment">
           <p className="text-muted text-center">{stars.toFixed(1)} | {numberOfReviews} Reviews</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <button className="btn btn1 mb-3 shadow-lg" onClick={(e)=>handleBtnClick(e)}>View Profile</button>
      </div>
    </div>
  );
};

export default PopularItem;
