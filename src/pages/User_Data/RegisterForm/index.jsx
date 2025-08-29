// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // ✅ For checking if already logged in
import './Style.css';
import { UserRegister } from '../../../API/UserRegisterApi';
import { validateUser } from '../../../validation/UserValidation';

const Register = () => {
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUser(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!agreed) {
      alert('Please agree to the terms and privacy policy.');
      return;
    }

    try {
      setLoading(true);
      setErrors([]);

      await UserRegister(formData);

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      // console.error('❌ Registration error:', error);
      setErrors([error?.message || 'Something went wrong.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {/* ✅ Show Errors */}
        {errors.length > 0 && (
          <ul className="error-list">
            {errors.map((err, i) => (
              <li key={i} className="error-item">{err}</li>
            ))}
          </ul>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="terms-label">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          I agree to the terms and privacy policy.
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="login-link">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            // style={{ cursor: 'pointer', color: 'blue' }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
