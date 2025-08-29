import React, { useState } from 'react';
import services from '../../pages/Services/index';
import './index.css';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSelectSuggestion = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  const filteredResults = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suggestions = services
    .filter(service =>
      searchTerm &&
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       service.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
       service.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .slice(0, 5); // limit suggestions to 5

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name, city, or category..."
        className="search-box"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true);
        }}
      />

      {/* 🔍 Suggestion Dropdown */}
      {showSuggestions && searchTerm && suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSelectSuggestion(s.name)}
              className="suggestion-item"
            >
              {s.name} - <span className="suggestion-meta">{s.city}, {s.category}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 🗂 Filtered Results */}
      <div className="result-list">
        {searchTerm && filteredResults.length === 0 && (
          <p className="no-results">No services found.</p>
        )}
        {filteredResults.map((service, i) => (
          <div key={i} className="service-card">
            <img src={service.image} alt={service.name} className="service-img" />
            <div className="service-details">
              <h4>{service.name}</h4>
              <p><strong>City:</strong> {service.city}</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Price:</strong> ₹{service.price}</p>
              <p><strong>Rating:</strong> ⭐ {service.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
