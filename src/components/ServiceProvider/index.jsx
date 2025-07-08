import React from 'react';
import providers from '../../Datas/ProvidersData'; // ✅ folder name should be lowercase and consistent

const ServiceProvider = ({ providerId }) => {
  if (!providerId) return <p>No provider ID provided.</p>;

  const provider = providers.find(p => p.id === providerId);

  if (!provider) return <p>Provider not found for ID: {providerId}</p>;

  return (
    <div className="provider-details">
      <h4>Service Provider:</h4>
      <img
        src={provider.image}
        alt={provider.name}
        // style={{ width: '120px', borderRadius: '10px', marginBottom: '10px' }}
      />
      <p><strong>Name:</strong> {provider.name}</p>
      <p><strong>Phone:</strong> {provider.phone}</p>
      <p><strong>Email:</strong> {provider.email}</p>
            <p><strong>Languages:</strong> {provider.languages?.join(', ') || 'Hindi/English'}</p>
    </div>
  );
};

export default ServiceProvider;
