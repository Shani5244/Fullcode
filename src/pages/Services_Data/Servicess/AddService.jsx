// src/pages/Servicess/EditService.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Services.css';

const EditService = ({ services, setServices }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = services.find(s => s.id === Number(id));

  const [form, setForm] = useState(existing || {
    name: '',
    category: '',
    city: '',
    price: '',
  });

  useEffect(() => {
    if (!existing) {
      alert("⚠️ Service not found. Redirecting...");
      navigate('/admin/services');
    }
  }, [existing, navigate]); // ✅ FIX: add dependencies

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = services.map(s => s.id === Number(id) ? form : s);
    setServices(updated);
    localStorage.setItem('adminServices', JSON.stringify(updated));
    alert('✅ Service updated!');
    navigate('/admin/services');
  };

  return (
    <div className="service-form-container">
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Service Name"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditService;
