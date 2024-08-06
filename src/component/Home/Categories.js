import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import CatogoriesItems from './CatogoriesItems';

const Categories = () => {
  const { data, loading, error } = useFetch("http://localhost:4000/categories");
  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <section id="Categories" className="pt-2 mb-5 categories">
      <div className="mx-auto w-3/4">
        <h2 className="font-bold text-center pt-2">Categories</h2>
        <p className="text-gray-600 text-center">Choose the intended category</p>
        <div className="footerline w-1/4 bg-gray-200 mx-auto pt-1 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((category) => {
            return(
           
              <CatogoriesItems key={category.id} category={category} />
            
          )})}
        </div>
      </div>
    </section>
  );
};

export default Categories;
