import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../pages/RegisterForm/Style.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("You must agree to the Terms & Conditions and Privacy Policy to continue.");
      return;
    }

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(formData));

    alert('Registration Successful! Please Login.');
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="agree">
            I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
          </label>
        </div>

        <button type="submit" disabled={!agreed}>
          Register
        </button>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>

      </form>
    </div>
  );
};

export default Register;
