import React, { useEffect, useState } from 'react';
import ProfileForm from '../ProfileServicesProvider';

const ManageProfile = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('loggedInProvider');
    if (data) {
      setProvider(JSON.parse(data));
    }
  }, []);

  const handleUpdate = (updatedData) => {
    localStorage.setItem('loggedInProvider', JSON.stringify(updatedData));
    setProvider(updatedData);
    alert('Profile updated successfully!');
  };

  return (
    <div>
      {provider ? (
        <ProfileForm provider={provider} onUpdate={handleUpdate} />
      ) : (
        <p style={{ textAlign: 'center' }}>Loading Profile...</p>
      )}
    </div>
  );
};

export default ManageProfile;
