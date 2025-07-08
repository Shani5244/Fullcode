import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Style.css';

const ServiceDetails = () => {
  const { state } = useLocation();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const service = state?.service;

  if (!service) return <p>Service not found</p>;

  const handleBookClick = () => {
    setShowPayment(true);
  };

  const handlePaymentConfirm = () => {
    alert(`Booking confirmed with ${selectedOption}`);
    // Save booking logic here (e.g., localStorage)
  };

  return (
    <div className="details-container">
      <img src={service.image} alt={service.name} className="details-image" />
      <h2>{service.name}</h2>
      <p><strong>Price:</strong> ₹{service.price}</p>
      <p>{service.description}</p>

      {!showPayment ? (
        <button onClick={handleBookClick}>Book Now</button>
      ) : (
        <div className="payment-options">
          <h4>Select Payment Option:</h4>
          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            Cash on Delivery
          </label><br />
          <label>
            <input
              type="radio"
              name="payment"
              value="UPI (Coming Soon)"
              disabled
            />
            UPI (Coming Soon)
          </label><br />
          <label>
            <input
              type="radio"
              name="payment"
              value="Card (Coming Soon)"
              disabled
            />
            Card (Coming Soon)
          </label><br />
          <button
            onClick={handlePaymentConfirm}
            disabled={!selectedOption}
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
