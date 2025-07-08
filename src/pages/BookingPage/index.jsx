// src/pages/BookingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingPage = ({ selectedService }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    const newBooking = {
      service: selectedService?.name || 'Unknown Service',
      status: 'Confirmed', // or 'Pending', 'Cancelled'
      time: new Date().toLocaleString()
    };

    const existing = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    const updated = [newBooking, ...existing];
    localStorage.setItem('bookingHistory', JSON.stringify(updated));

    alert('Booking Confirmed!');
    navigate('/home'); // Or anywhere else
  };

  return (
    <div className="booking-page">
      <h2>Book: {selectedService?.name || 'Service'}</h2>
      <p>Price: ₹{selectedService?.price || 500}</p>
      <button onClick={handleBooking} className="btn btn-success">Book Now</button>
    </div>
  );
};

export default BookingPage;
