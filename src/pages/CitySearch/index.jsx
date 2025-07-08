// src/pages/CitySearch/index.jsx (or src/components/CitySearch.jsx)
import React, { useState } from 'react';
import cities from '../../Datas/CitiesData'; // Make sure this file exports an array
import { useNavigate } from 'react-router-dom';
import './Style.css';

const CitySearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const matches = cities.filter(city =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSelect = (city) => {
    setQuery(city);
    setSuggestions([]);
    navigate(`/services/${city.toLowerCase()}`);
  };

  return (
    <div className="city-search-container">
      <input
        type="text"
        className="city-search-input"
        placeholder="Enter your city..."
        value={query}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="city-suggestion-list">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
