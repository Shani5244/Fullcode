import React, { useEffect, useState } from 'react';
import ProfileForm from '../../components/ProfileServicesProvider'; // Adjust this if needed
import './Style.css'; // Optional: use your CSS if required

const ManageProfile = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('loggedInProvider');
    if (stored) {
      setProvider(JSON.parse(stored));
    }
  }, []);

  const handleUpdate = (updatedData) => {
    localStorage.setItem('loggedInProvider', JSON.stringify(updatedData));
    setProvider(updatedData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="manage-profile-container">
      <h2>Manage Profile</h2>
      {provider ? (
        <ProfileForm provider={provider} onUpdate={handleUpdate} />
      ) : (
        <p>Loading provider data...</p>
      )}
    </div>
  );
};

export default ManageProfile;
