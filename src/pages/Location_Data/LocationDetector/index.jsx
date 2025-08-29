import React, { useEffect, useState } from 'react';
import getCityFromCoords from '../../../utils/GetCityFromCoords';
import './Style.css';

const LocationDetector = () => {
  const [location, setLocation] = useState('Detecting...');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const city = await getCityFromCoords(latitude, longitude);
        setLocation(city || 'Location not found');
        localStorage.setItem('userCity', city); // ✅ Save for later use
      },
      () => {
        setError('Permission denied. Unable to fetch location.');
        setLocation('Unknown');
      }
    );
  }, []);

  return (
    <div className="location-info">
      📍 You’re in: <strong>{location}</strong>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LocationDetector;
