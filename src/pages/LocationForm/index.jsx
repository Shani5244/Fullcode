// src/pages/LocationForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import cities from '../../Datas/CitiesData';
import './Style.css';

const LocationForm = () => {
  const [form, setForm] = useState({
    house: '',
    landmark: '',
    city: '',
    locationType: 'Home',
  });

  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const existingLocation = JSON.parse(localStorage.getItem('locationProfile'));
    if (existingLocation) {
      setForm(existingLocation);

      if (!state?.edit) {
        // 👇 If not editing, go to profile
        navigate('/profile');
      } else {
        setIsEditing(true);
      }
    }
  }, [navigate, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'city') {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }

    setErrorMessage('');
  };

  const handleSuggestionClick = (city) => {
    setForm({ ...form, city });
    setSuggestions([]);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.house.trim()) newErrors.house = 'House No is required';
    if (!form.landmark.trim()) newErrors.landmark = 'Landmark is required';
    if (!form.city || !cities.includes(form.city)) newErrors.city = 'Invalid city';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) setErrorMessage('Address not found.');
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem('locationProfile', JSON.stringify(form));

    // ✅ If redirected here from a booking, go to payment
    const tempBooking = JSON.parse(localStorage.getItem('tempBooking'));
    if (tempBooking) {
      navigate('/payment');
    } else {
      navigate('/profile'); // Otherwise go to profile
    }
  };

  return (
    <div className="location-form-container">
      <h2>{isEditing ? 'Edit Location' : 'Enter Your Location'}</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="house"
          value={form.house}
          onChange={handleChange}
          placeholder="House No / Flat No"
        />
        {errors.house && <div className="error">{errors.house}</div>}

        <input
          type="text"
          name="landmark"
          value={form.landmark}
          onChange={handleChange}
          placeholder="Landmark"
        />
        {errors.landmark && <div className="error">{errors.landmark}</div>}

        <div className="city-search">
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Search City"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((city, idx) => (
                <li key={idx} onClick={() => handleSuggestionClick(city)}>{city}</li>
              ))}
            </ul>
          )}
          {errors.city && <div className="error">{errors.city}</div>}
        </div>

        <div className="location-type">
          <label>
            <input
              type="radio"
              name="locationType"
              value="Home"
              checked={form.locationType === 'Home'}
              onChange={handleChange}
            />
            Home
          </label>
          <label>
            <input
              type="radio"
              name="locationType"
              value="Other"
              checked={form.locationType === 'Other'}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <button type="submit">{isEditing ? 'Update Location' : 'Save & Continue'}</button>
      </form>
    </div>
  );
};

export default LocationForm;
