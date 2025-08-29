// src/ServicesProvider/ProviderSidebar/index.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const ProviderSidebar = () => (
  <div className="provider-sidebar">
    <h3>Provider Panel</h3>

    <ul>
      <li>
        <NavLink to="/provider/dashboard/requests">📥 Requests</NavLink>
      </li>
      <li>
        <NavLink to="/provider/dashboard/completed">✅ Completed</NavLink>
      </li>
      <li>
        <NavLink to="/provider/dashboard/earnings">💰 Earnings</NavLink>
      </li>
      <li>
        <NavLink to="/provider/dashboard/ratings">⭐ Ratings</NavLink>
      </li>
      <li>
        <NavLink to="/provider/dashboard/update-profile">📝 Update Profile</NavLink>
      </li>
    </ul>

    <ul>
      <li>
        <NavLink to="/provider/dashboard">🏠 Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/provider/profile">👤 Manage Profile</NavLink>
      </li>
      <li>
        <NavLink to="/provider/bookings">📚 My Bookings</NavLink>
      </li>
    </ul>
  </div>
);

export default ProviderSidebar;
