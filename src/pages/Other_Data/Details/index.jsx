// src/pages/Details/index.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Style.css';
import { useCart } from '../../../context/CartContext'; // ✅ Import CartContext

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Use addToCart from context

  const [service] = useState(() => {
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
    }
  }, [service, navigate]);

  const priceOptions = service?.priceOptions || {};

  const handleBookNow = () => {
    if (!selectedPlan || !priceOptions[selectedPlan]) {
      alert("⚠️ Please select a valid plan.");
      return;
    }

    const updatedBooking = {
      ...service,
      plan: selectedPlan,
      price: priceOptions[selectedPlan],
    };

    localStorage.setItem('currentBooking', JSON.stringify(updatedBooking));
    const userLocation = localStorage.getItem('locationProfile');
    if (!userLocation) {
      navigate('/location');
    } else {
      navigate('/payment');
    }
  };

  const handleAddToCart = () => {
    if (!selectedPlan || !priceOptions[selectedPlan]) {
      alert("⚠️ Please select a valid plan.");
      return;
    }

    const cartItem = {
      ...service,
      plan: selectedPlan,
      price: priceOptions[selectedPlan],
    };

    addToCart(cartItem);
    alert("✅ Service added to cart!");
  };

  if (!service) return null;

  return (
    <div className="details-container">
      <div className="details-content">
        <h2>{service.name}</h2>
        <p><strong>Experience:</strong> {service.experience} years</p>
        <p><strong>Rating:</strong> {service.rating} ⭐</p>
        <p><strong>Contact:</strong> {service.contact}</p>
        <p><strong>Details:</strong> {service.details}</p>

        <h4>Select a Plan:</h4>
        <div className="price-options">
          {Object.entries(priceOptions).map(([plan, price]) => (
            <label key={plan}>
              <input
                type="radio"
                name="plan"
                checked={selectedPlan === plan}
                onChange={() => setSelectedPlan(plan)}
              />
              {plan} - ₹{price}
            </label>
          ))}
        </div>

        <div className="d-flex gap-3 mt-3">
          <button className="book-now-button" onClick={handleBookNow}>
            Book Now
          </button>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart 🛒
          </button>
        </div>
      </div>

      <img
        src={service.image}
        alt={service.name}
        className="details-image"
      />
    </div>
  );
};

export default Details;
