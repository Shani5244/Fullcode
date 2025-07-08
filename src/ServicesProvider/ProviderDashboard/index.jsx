// src/pages/ProviderDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderLoggedIn from '../../utils/ProviderLoggedIn';
import './Style.css';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [completedBookings, setCompletedBookings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loggedInProvider = JSON.parse(localStorage.getItem('loggedInProvider'));

    if (!ProviderLoggedIn() || !loggedInProvider) {
      alert("Please login as provider.");
      navigate('/provider-login');
      return;
    }

    setProvider(loggedInProvider);

    const bookings = JSON.parse(localStorage.getItem('bookingHistory')) || [];

    const providerBookings = bookings.filter(
      b => b.providerEmail === loggedInProvider.email && b.status === 'completed'
    );

    setCompletedBookings(providerBookings);

    // Calculate average rating
    const ratings = providerBookings.map(b => Number(b.rating)).filter(Boolean);
    const avg = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

    setAverageRating(avg);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInProvider');
    navigate('/provider-login');
  };

  const earningPerBooking = 500;
  const totalEarnings = completedBookings.length * earningPerBooking;

  if (!provider) return null;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {provider.name}</h2>
      <p><strong>Service:</strong> {provider.service}</p>
      <p><strong>Email:</strong> {provider.email}</p>

      <hr />

      <div className="dashboard-metrics">
        <h3>📦 Completed Bookings: {completedBookings.length}</h3>
        <h3>💰 Total Earnings: ₹{totalEarnings}</h3>
        <h3>⭐ Average Rating: {averageRating}</h3>
      </div>

      <h3>📝 Reviews:</h3>
      <ul className="review-list">
        {completedBookings.map((b, i) => (
          <li key={i}>
            <strong>{b.serviceName}</strong>: "{b.review || 'No review'}" – ⭐ {b.rating || 'N/A'}
          </li>
        ))}
      </ul>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProviderDashboard;
