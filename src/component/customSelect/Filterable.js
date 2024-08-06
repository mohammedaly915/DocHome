import React, { useState, useRef, useEffect } from 'react';
import './select.scss'; // Import Sass file

const options = ['Elon Musk', 'Bill Gates', 'Steve Jobs','marwan bablo'];

const FilterableSelect = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(true); // For initial open state

  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!inputRef.current || !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(inputValue)
  );

  return (
    <div className="filterable-select">
      <h1 className="title">
        <span className="highlight">filterable</span> select dropdown
      </h1>
      <form className="form">
        <input
          className="chosen-value"
          type="text"
          value={inputValue}
          placeholder="Type to filter"
          onChange={handleInputChange}
          ref={inputRef}
          onFocus={() => setIsOpen(true)}
        />
        <ul className={`value-list ${isOpen ? 'open' : ''}`}>
          {filteredOptions.map((option, index) => (
            <li key={index} className="value-item" onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
 export default FilterableSelect