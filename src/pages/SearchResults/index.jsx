import React from 'react';
import { useLocation } from 'react-router-dom';
import services from '../../data/PeopleData'; // Replace with your actual data file

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(query)
  );

  return (
    <div className="search-results-container">
      <h2>Search Results for: <span className="highlight">{query}</span></h2>
      {filteredServices.length === 0 ? (
        <p>No matching services found.</p>
      ) : (
        <ul className="result-list">
          {filteredServices.map((service, idx) => (
            <li key={idx} className="result-item">
              <h4>{service.name}</h4>
              <p>{service.description}</p>
              <p>Price: ₹{service.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
