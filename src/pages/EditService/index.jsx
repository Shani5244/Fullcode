import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditService = () => {
  const { state } = useLocation();
  const service = state?.service;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || '',
    image: service?.image || ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Service:', formData);
    alert('Service updated (mock)');
    navigate('/admin');
  };

  return (
    <div className="edit-service">
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
      <img src={formData.image} alt="Preview" height="100px" />
    </div>
  );
};

export default EditService;
