import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const AddService = ({ services, setServices }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    city: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      ...form,
      id: Date.now(),
      rating: 5,
      image: '/default.jpg' // or upload later
    };
    const updated = [...services, newService];
    setServices(updated);
    localStorage.setItem('adminServices', JSON.stringify(updated));
    navigate('/admin/services');
  };

  return (
    <div className="service-form-container">
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <input name="name" placeholder="Service Name" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
