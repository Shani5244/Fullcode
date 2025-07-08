import React, { useState } from 'react';
import '../../pages/ServiceFilter/Style.css';

const ServiceFilter = ({ services }) => {
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const filteredServices = services.filter(service => {
    return (
      (location ? service.location.toLowerCase().includes(location.toLowerCase()) : true) &&
      (price ? service.price <= parseInt(price) : true) &&
      (rating ? service.rating >= parseFloat(rating) : true)
    );
  });

  return (
    <div className="filter-container">
      <h2>Filter Services</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Max Price</option>
          <option value="500">₹500</option>
          <option value="1000">₹1000</option>
          <option value="2000">₹2000</option>
        </select>

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Minimum Rating</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="services-list">
        {filteredServices.length === 0 ? (
          <p>No services match the filter.</p>
        ) : (
          filteredServices.map(service => (
            <div key={service.id} className="service-card">
              <h4>{service.name}</h4>
              <p>Location: {service.location}</p>
              <p>Price: ₹{service.price}</p>
              <p>Rating: ⭐ {service.rating}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceFilter;
