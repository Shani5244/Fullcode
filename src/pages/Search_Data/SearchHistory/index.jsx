import React, { useState, useEffect } from 'react';
import './Style.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // Load previous search history from localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);

  // Save search term and update localStorage
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const updatedHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10); // max 10 items
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    alert(`🔍 You searched for: "${query}"`);
    setQuery('');
  };

  // Optional: Click to search again
  const handleHistoryClick = (item) => {
    setQuery(item);
  };

  // Optional: Clear search history
  const handleClearHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {searchHistory.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h4>Recent Searches</h4>
            <button onClick={handleClearHistory} className="clear-btn">Clear</button>
          </div>
          <ul className="history-list">
            {searchHistory.map((item, index) => (
              <li key={index} onClick={() => handleHistoryClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
