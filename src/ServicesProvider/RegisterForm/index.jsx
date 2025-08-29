import React, { useState } from "react";
// src/ServicesProvider/RegisterForm/index.jsx
import { ProviderRegister } from '../../API/ProviderRegisterApi'; // ✅ Correct import
import { Link } from "react-router-dom";
import "./Style.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    age: "",
    city: "",
    state: "",
    serviceType: "",
    experience: "",
    serviceCharges: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // 🔹 Full validation for all fields
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.phone)
      newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!formData.gender)
      newErrors.gender = "Gender is required";

    if (!formData.age)
      newErrors.age = "Age is required";
    else if (formData.age < 18)
      newErrors.age = "Age must be 18 or above";

    if (!formData.city.trim())
      newErrors.city = "City is required";

    if (!formData.state.trim())
      newErrors.state = "State is required";

    if (!formData.serviceType.trim())
      newErrors.serviceType = "Service Type is required";

    if (!formData.experience)
      newErrors.experience = "Experience is required";
    else if (formData.experience < 0)
      newErrors.experience = "Experience cannot be negative";

    if (!formData.serviceCharges)
      newErrors.serviceCharges = "Service charges are required";
    else if (formData.serviceCharges <= 0)
      newErrors.serviceCharges = "Service charges must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // remove error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await ProviderRegister(formData);
      setMessage("🎉 Registration Successful!");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        age: "",
        city: "",
        state: "",
        serviceType: "",
        experience: "",
        serviceCharges: "",
      });
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Provider Register</h2>

        {/* Full Name */}
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* Phone */}
        <div className="input-group">
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        {/* Gender */}
        <div className="input-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">--Select--</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>

        {/* Age */}
        <div className="input-group">
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>

        {/* City */}
        <div className="input-group">
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          {errors.city && <p className="error-text">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="input-group">
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
          {errors.state && <p className="error-text">{errors.state}</p>}
        </div>

        {/* Service Type */}
        <div className="input-group">
          <label>Service Type</label>
          <input type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} />
          {errors.serviceType && <p className="error-text">{errors.serviceType}</p>}
        </div>

        {/* Experience */}
        <div className="input-group">
          <label>Experience (Years)</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
          {errors.experience && <p className="error-text">{errors.experience}</p>}
        </div>

        {/* Service Charges */}
        <div className="input-group">
          <label>Service Charges (₹)</label>
          <input type="number" name="serviceCharges" value={formData.serviceCharges} onChange={handleChange} />
          {errors.serviceCharges && <p className="error-text">{errors.serviceCharges}</p>}
        </div>

        <button type="submit" className="btn">Register</button>
        {message && <p className="message">{message}</p>}

        <p className="switch-link">
          Already have an account? <Link to="/provider-login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
