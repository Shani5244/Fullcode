import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'; // Make sure this matches your folder/file

const ProviderRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    service: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password, service } = form;

    // Basic Validation
    if (!name || !email || !phone || !password || !service) {
      return setError('All fields are required');
    }
    if (!email.includes('@') || !email.includes('.')) {
      return setError('Invalid email format');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    const existing = JSON.parse(localStorage.getItem('serviceProviders')) || [];
    const duplicate = existing.find((p) => p.email === email);
    if (duplicate) {
      return setError('Email is already registered');
    }

    existing.push(form);
    localStorage.setItem('serviceProviders', JSON.stringify(existing));
    localStorage.setItem('loggedInProvider', JSON.stringify(form)); // auto login (optional)
    navigate('/'); // Redirect to home after registration
  };

  return (
    <div className="form-container">
      <h2>Register as Service Provider</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input name="service" placeholder="Service Type (e.g., Plumber)" value={form.service} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered?{' '}
        <span onClick={() => navigate('/provider-login')} style={{ color: 'blue', cursor: 'pointer' }}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default ProviderRegister;
