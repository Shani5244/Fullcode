import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import BookingStatus from '../../pages/BookingStatus';
import './Style.css';

const Profile = () => {
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocation = JSON.parse(localStorage.getItem('locationProfile'));
    if (storedLocation) setLocation(storedLocation);
  }, []);

  const handleLogout = () => {
    // ✅ Clear only relevant data
    localStorage.removeItem('locationProfile');
    localStorage.removeItem('bookingHistory');
    localStorage.removeItem('tempBooking');

    // ✅ Redirect to login
    navigate('/login');
  };

  if (!location) {
    return (
      <div className="profile-container">
        <h2>No Profile Data Found</h2>
        <p>You haven't completed a location form yet.</p>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="profile-section">
        <h3>🏠 Saved Location</h3>
        <p><strong>House No:</strong> {location.house}</p>
        <p><strong>Landmark:</strong> {location.landmark}</p>
        <p><strong>City:</strong> {location.city}</p>
        <p><strong>Location Type:</strong> {location.locationType}</p>
      </div>
      {/* <BookingStatus /> */}
    </div>
  );
};

export default Profile;
