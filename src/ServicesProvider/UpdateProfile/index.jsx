import React, { useState } from 'react';

const UpdateProfile = () => {
  const [provider, setProvider] = useState(
    JSON.parse(localStorage.get('loggedInProvider')) || {}
  );

  const handleChange = e => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('loggedInProvider', JSON.stringify(provider));
    alert('Profile updated!');
  };

  return (
    <div>
      <h2>📝 Update Profile</h2>
      <input name="name" value={provider.name || ''} onChange={handleChange} placeholder="Name" />
      <input name="email" value={provider.email || ''} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={provider.phone || ''} onChange={handleChange} placeholder="Phone" />
      <input name="service" value={provider.service || ''} onChange={handleChange} placeholder="Service Type" />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UpdateProfile;
