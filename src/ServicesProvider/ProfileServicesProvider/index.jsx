// src/components/Provider/ProfileForm.jsx
import React, { useState } from 'react';
import defaultAvatar from '../../Asstes/Services/default-avatar.png'; // ✅ check folder name "Assets"
import './Style.css';

const ProfileForm = ({ provider, onUpdate }) => {
  const [formData, setFormData] = useState({ ...provider });
  const [preview, setPreview] = useState(provider.photo || defaultAvatar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="image-preview">
        <img
          src={preview}
          alt="Profile"
          width="100"
          height="100"
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        name="service"
        placeholder="Service Type"
        value={formData.service}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
