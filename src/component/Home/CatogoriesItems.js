import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CatogoriesItems = ({ category }) => {

  const category_id=category.id;
  const navigate=useNavigate()
  const handleCategory=()=>{
      navigate(`/category/stuff/:${category_id}`, {state: { category_id} })
  }
  return (
      <div onClick={()=>handleCategory()} className="cursor-pointer CategoriesItem bg-white p-8 rounded shadow hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <img src={`http://dochomd4u.000webhostapp.com/${category.image}`} className="category_icon mb-4" alt="" />
        <h4 className="font-bold text-blue-700">{category.name_en}</h4>
        <p className="text-gray-600 text-sm">{category.description_en.slice(0, 150)}</p>
      </div>
    // </Link>
  );
}

export default CatogoriesItems;
