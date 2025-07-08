// src/pages/Details.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Style.css';

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [service, setService] = useState(() => {
    try {
      return state?.service || JSON.parse(localStorage.getItem('currentBooking'));
    } catch {
      return null;
    }
  });

  const [selectedPlan, setSelectedPlan] = useState('basic');

  useEffect(() => {
    if (!service) {
      alert("❌ Service not found.");
      navigate('/');
    } else {
      localStorage.setItem('currentBooking', JSON.stringify(service));
    }
  }, [service, navigate]);

  const priceOptions = service?.priceOptions || {};

  const handleBookNow = () => {
    if (!selectedPlan || !priceOptions[selectedPlan]) {
      alert("⚠️ Please select a valid service plan.");
      return;
    }

    const currentBooking = {
      ...service,
      plan: selectedPlan,
      price: priceOptions[selectedPlan],
    };

    localStorage.setItem('currentBooking', JSON.stringify(currentBooking));
    navigate('/payment'); // ✅ Redirect to payment page
  };

  if (!service) return null;

  return (
    <div className="details-container">
      <div className="details-content">
        <h2>{service.name}</h2>
        <p><strong>Experience:</strong> {service.experience || 'N/A'} years</p>
        <p><strong>Rating:</strong> {service.rating || 'Not rated'} ⭐</p>
        <p><strong>Contact:</strong> {service.contact || 'N/A'}</p>
        <p><strong>Details:</strong> {service.details || 'No details available.'}</p>

        <h4>Choose a Service Plan:</h4>
        <div className="price-options">
          {Object.entries(priceOptions).map(([plan, price]) => (
            <label key={plan}>
              <input
                type="radio"
                name="price"
                value={plan}
                checked={selectedPlan === plan}
                onChange={() => setSelectedPlan(plan)}
              />
              {plan.charAt(0).toUpperCase() + plan.slice(1)} - ₹{price}
            </label>
          ))}
        </div>

        <button className="book-now-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>

      <img
        src={service.image || 'https://via.placeholder.com/300x200.png?text=No+Image'}
        alt={service.name}
        className="details-image"
      />
    </div>
  );
};

export default Details;
