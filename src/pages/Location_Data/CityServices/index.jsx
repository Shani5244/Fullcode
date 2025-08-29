import React from 'react';
import { useParams } from 'react-router-dom';

const CityServices = () => {
  const { city } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Services available in {city.charAt(0).toUpperCase() + city.slice(1)}</h2>
      {/* You can filter services based on city */}
    </div>
  );
};

export default CityServices;
