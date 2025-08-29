// src/pages/ProviderDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProviderSidebar from '../../ServicesProvider/ProviderSidebar';
import Completed from '../../ServicesProvider/Completed';
import Earnings from '../../ServicesProvider/Earnings';
import UpdateProfile from '../../ServicesProvider/UpdateProfile';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedBookings, setCompletedBookings] = useState([]);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loggedInProvider = JSON.parse(localStorage.get('loggedInProvider'));
    if (!loggedInProvider) {
      alert('Access denied. Please log in as provider.');
      navigate('/provider-login');
      return;
    }

    setProvider(loggedInProvider);

    const bookings = JSON.parse(localStorage.get('bookingHistory')) || [];
    const providerBookings = bookings.filter(
      b => b.providerEmail === loggedInProvider.email && b.status === 'completed'
    );
    setCompletedBookings(providerBookings);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInProvider');
    navigate('/provider-login');
  };

  if (!provider) return null;

  return (
    <div className="provider-dashboard" style={{ display: 'flex', minHeight: '100vh' }}>
      <ProviderSidebar />
      <div className="provider-dashboard-content" style={{ flex: 1, padding: '20px' }}>
        {location.pathname === '/provider/dashboard' && (
          <>
            <h2>Welcome, {provider.name}</h2>
            <p><strong>Service:</strong> {provider.service}</p>
            <p><strong>Email:</strong> {provider.email}</p>
            <hr />

            <ul className="review-list">
              {completedBookings.map((b, i) => (
                <li key={i}>
                  <strong>{b.serviceName || b.name}</strong>: "{b.review || 'No review'}" – ⭐ {b.rating || 'N/A'}
                </li>
              ))}
            </ul>

            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <hr />
          </>
        )}

        {/* Sidebar Sub Routes */}
        <Routes>
          <Route path="completed" element={<Completed />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="update-profile" element={<UpdateProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProviderDashboard;
