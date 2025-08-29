import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'; // Ensure correct path to your CSS file

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

  const validate = () => {
    const { name, email, phone, password, service } = form;

    if (!name || !email || !phone || !password || !service) {
      return 'All fields are required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return 'Phone must be 10 digits';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      return setError(validationError);
    }

    const existing = JSON.parse(localStorage.getItem('serviceProviders')) || [];
    const duplicate = existing.find((p) => p.email === form.email);

    if (duplicate) {
      return setError('Email is already registered');
    }

    existing.push(form);
    localStorage.setItem('serviceProviders', JSON.stringify(existing));

    // Do NOT auto login
    // Redirect to login page
    navigate('/provider-login');
  };

  return (
    <div className="form-container">
      <h2>Register as Service Provider</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="service"
          placeholder="Service Type (e.g., Electrician, Plumber)"
          value={form.service}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already registered?{' '}
        <span
          onClick={() => navigate('/provider-login')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default ProviderRegister;
