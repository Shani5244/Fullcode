// src/pages/BookingStatus.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceProvider from '../../components/ServiceProvider';
import ServiceRatingSnapshot from '../../components/ServiceRatingSnapshot';
import { saveRating } from '../../Datas/RatingsData';
import RatingSnapshot from '../../pages/RatingSnapshot';
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
    const stored = localStorage.getItem('bookingHistory');
    if (!stored) {
      setBookings([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setBookings(parsed);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("❌ Failed to parse bookingHistory:", err);
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
      saveRating(ratedBooking.name, value);
      setFeedbacks((prev) => ({ ...prev, [index]: true }));
      setPopupMessage(`Thank you for rating "${ratedBooking.name}" ${value} stars!`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="booking-status-container">
      <h2>Your Booking Status</h2>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">{popupMessage}</div>
        </div>
      )}

      <RatingSnapshot ratings={{ 5: 213, 4: 40, 3: 31, 2: 15, 1: 19 }} />

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

                <p><strong>Location:</strong>{' '}
                  {booking?.location && booking.location.house && booking.location.city
                    ? `${booking.location.house}, ${booking.location.landmark || ''}, ${booking.location.city}`
                    : 'N/A'}
                </p>

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
                  <div className="provider-details">
                    <h4>👤 Assigned Provider</h4>
                    <img src={booking.provider.image} alt={booking.provider.name} className="provider-photo" />
                    <p><strong>Name:</strong> {booking.provider.name}</p>
                    <p><strong>Phone:</strong> {booking.provider.phone}</p>
                    <p><strong>Email:</strong> {booking.provider.email}</p>
                  </div>
                ) : (
                  <p><em>No provider assigned</em></p>
                )}

                {booking.provider ? (
                  <ServiceProvider provider={booking.provider} />
                ) : (
                  <p><em>No provider assigned</em></p>
                )}

                <div className="rate-service">
                  <p><strong>Rate this service:</strong></p>
                  <InteractiveStarRating onRate={(value) => handleRateService(index, value)} />
                  {feedbacks[index] && (
                    <p className="thank-you-message">Thank you for your feedback!</p>
                  )}
                </div>

                <ServiceRatingSnapshot ratingStats={{ 5: 2192, 4: 1103, 3: 525, 2: 150, 1: 75 }} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default BookingStatus;
