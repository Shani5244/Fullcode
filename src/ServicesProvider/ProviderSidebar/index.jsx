// src/ServicesProvider/ProviderSidebar/index.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ProviderSidebar = () => (
  <div className="provider-sidebar">
    <h3>Provider Panel</h3>
    <ul>
      <li><NavLink to="requests">📥 Requests</NavLink></li>
      <li><NavLink to="completed">✅ Completed</NavLink></li>
      <li><NavLink to="earnings">💰 Earnings</NavLink></li>
      <li><NavLink to="ratings">⭐ Ratings</NavLink></li>
      <li><NavLink to="update-profile">📝 Update Profile</NavLink></li>
    </ul>

    <ul>
      <li><Link to="/Servicesprovider/dashboard">Dashboard</Link></li>
<li><Link to="/provider/profile">Manage Profile</Link></li>
      <li><Link to="/Servicesprovider/bookings">My Bookings</Link></li>
    </ul>
  </div>
);

export default ProviderSidebar;
