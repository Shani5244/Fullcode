// src/pages/BookingStatus.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceProvider from '../../components/ServiceProvider';
import InteractiveStarRating from '../../components/InteractiveStarRating';
import './Style.css';

const BookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    try {
      const stored = localStorage.getItem('bookingHistory');
      const parsed = JSON.parse(stored) || [];
      setBookings(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error('❌ Error loading bookings:', err);
      setBookings([]);
    }
  };

  const handleClearBookings = () => {
    if (window.confirm('Are you sure you want to delete all bookings?')) {
      localStorage.removeItem('bookingHistory');
      setBookings([]);
    }
  };

  const handleRateService = (index, value) => {
    const ratedBooking = bookings[index];
    if (ratedBooking && ratedBooking.name) {
      setFeedbacks((prev) => ({ ...prev, [index]: true }));
      setPopupMessage(`Thank you for rating "${ratedBooking.name}" ${value} stars!`);
      setShowPopup(true);
           setTimeout(() => setShowPopup(false), 2000);
    }
  };

  // ✅ FIXED LOCATION FORMATTER
  const renderLocation = (location) => {
    if (!location) return 'Address not provided';

    // If location is a string (fallback)
    if (typeof location === 'string') return location;

    const { house, landmark, city, state, pincode } = location;
    const parts = [house, landmark, city, state, pincode].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Address not provided';
  };

  return (
    <div className="booking-status-container">
      <h2>Your Booking Status</h2>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">{popupMessage}</div>
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <>
          <div className="clear-button-container">
            <button className="clear-bookings-btn" onClick={handleClearBookings}>
              🗑️ Clear All Bookings
            </button>
          </div>

          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={`${booking.name}-${booking.date}-${index}`} className="booking-item">
                <h3>{booking?.name || 'Unknown Service'}</h3>
                <p><strong>Plan:</strong> {booking?.plan}</p>
                <p><strong>Price:</strong> ₹{booking?.price}</p>
                <p><strong>Date:</strong> {booking?.date}</p>

                <p><strong>Location:</strong> {renderLocation(booking.location)}</p>

                <p><strong>Payment Method:</strong> {booking?.method || 'Not selected'}</p>
                <p><strong>Status:</strong>{' '}
                  <span className={
                    booking.status === 'Confirmed'
                      ? 'status-confirmed'
                      : booking.status === 'Cancelled'
                        ? 'status-cancelled'
                        : 'status-pending'
                  }>
                    {booking.status || 'Pending'}
                  </span>
                </p>

                <button onClick={() => {
                  localStorage.setItem('currentBooking', JSON.stringify(booking));
                  navigate('/details', { state: { service: booking } });
                }}>
                  📄 View Details
                </button>

                {booking.provider ? (
                  <>
                    <div className="provider-details">
                      <h4>👤 Assigned Provider</h4>
                      <img src={booking.provider.image} alt={booking.provider.name} className="provider-photo" />
                      <p><strong>Name:</strong> {booking.provider.name}</p>
                      <p><strong>Phone:</strong> {booking.provider.phone}</p>
                      <p><strong>Email:</strong> {booking.provider.email}</p>
                    </div>
                    <ServiceProvider provider={booking.provider} />
                  </>
                ) : (
                  <p><em>No provider assigned yet.</em></p>
                )}

                <div className="rate-service">
                  <p><strong>Rate this service:</strong></p>
                  <InteractiveStarRating onRate={(value) => handleRateService(index, value)} />
                  {feedbacks[index] && (
                    <p className="thank-you-message">Thank you for your feedback!</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default BookingStatus;
