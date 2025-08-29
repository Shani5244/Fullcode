import React from 'react';

const ProviderProfileCard = ({ provider }) => {
  return (
    <div className="profile-card">
      <img src={provider.image} alt="Provider" width={100} />
      <h3>{provider.name}</h3>
      <p>Today's Earnings: ₹{provider.earningsToday}</p>
      <p>Total Services: {provider.totalCompleted}</p>
      <p>Rating: ⭐ {provider.rating}</p>
    </div>
  );
};

export default ProviderProfileCard;
