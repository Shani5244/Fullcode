// src/pages/SearchBar/index.jsx
import React, { useState } from 'react';
import './Style.css';
import suggestionsData from '../../../suggestions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestionsData.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    handleSearch(suggestion);
  };

  const handleSearch = (customQuery) => {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim()) {
      alert('Please enter a search term.');
      return;
    }

    // Navigate to search results page or just log for now
    console.log('Searching for:', finalQuery);
    navigate(`/search?query=${encodeURIComponent(finalQuery)}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search services..."
        value={query}
        onChange={handleChange}
      />
      <button className="search-button" onClick={() => handleSearch()}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
