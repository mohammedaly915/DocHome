import React, { useEffect, useRef, useState } from 'react';
import './select.scss'; // Import Sass file
import { useFetch } from '../../hooks/useFetch';
import Loading from '../loading/Loading';


const CustomSelect = ({onSelectChange ,centers,loading,error}) => {
  const options = [
    { id: 0, name_en: 'Select City',name_ar:"اختار المدينة" } 
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef=useRef()

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false); // Close select if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return (<Loading/>)
  if (error) return <p> {error.message}</p>

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = (option) => {
    setSelectedOption(option);
    onSelectChange(option)
    toggleSelect();
  };

  return (
  
    <div className="custom-select" ref={selectRef}>
      <div className={`select-selected ${isOpen?"active":""}`} onClick={() => toggleSelect()}>
        <span>{selectedOption.name_ar}</span>
      </div>
      {isOpen&&<div className={`select-items ${selectedOption.value === 0 ? '' : ''}`}>
        {centers&&centers.map((region) => (
          <div key={region.id}  className="select-item" onClick={() => handleClick(region)}>
            {region.name_ar}
          </div>
        ))}
      </div>}
    </div>
  

  );
};



export default CustomSelect;
