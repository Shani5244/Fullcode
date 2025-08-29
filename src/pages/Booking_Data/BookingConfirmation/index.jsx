import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const { state } = useLocation();

  if (!state || !state.service) return <p>No booking found</p>;

  return (
    <div className="confirmation">
      <h2>✅ Booking Confirmed!</h2>
      <p>You’ve successfully booked <strong>{state.service.name}</strong>.</p>
      <p>We’ve sent a notification to your dashboard.</p>
    </div>
  );
};

export default BookingConfirmation;
