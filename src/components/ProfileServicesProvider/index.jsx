import React, { useState } from 'react';
import defaultAvatar from '../../Asstes/Services/default-avatar.png';

const ProfileForm = ({ provider, onUpdate }) => {
  const [formData, setFormData] = useState({ ...provider });
  const [preview, setPreview] = useState(provider.photo || defaultAvatar);
  const [isEditing, setIsEditing] = useState(false); // 🔐 Control edit mode

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (!isEditing) return; // Prevent image change if not editing

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
    setIsEditing(false); // Exit edit mode after update
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="image-preview">
        <img
          src={preview}
          alt="Profile"
          width="100"
          height="100"
          style={{ borderRadius: '50%' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!isEditing}
        />
      </div>

      <label>Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      <label>Email:
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      <label>Phone:
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      <label>Service Type:
        <input
          name="service"
          value={formData.service}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      <label>Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      {!isEditing ? (
        <button type="button" onClick={() => setIsEditing(true)}>
          ✏️ Edit Profile
        </button>
      ) : (
        <button type="submit">✅ Update Profile</button>
      )}
    </form>
  );
};

export default ProfileForm;
