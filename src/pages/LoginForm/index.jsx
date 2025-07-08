import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../pages/LoginForm/Style.css'
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => { 
    let tempErrors = {};
    if (!username) tempErrors.username = 'Username is required';
    if (!password) tempErrors.password = 'Password is required';
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const savedUser = JSON.parse(localStorage.getItem('user'));

      if (savedUser && username === savedUser.name && password === savedUser.password) {
        localStorage.setItem('isLoggedIn', 'true'); // set login status
        alert('Login Successful!');
        navigate('/home'); // go to home page
      } else {
        alert('Invalid Username or Password!');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className='input-box'>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className='icon' />
          {errors.username && <span className='error'>{errors.username}</span>}
        </div>

        <div className='input-box'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
          {errors.password && <span className='error'>{errors.password}</span>}
        </div>

        <div className='remember-forgot'>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          {/* Fixed: replaced href="#" with button */}
          <button type="button" className="forgot-btn" onClick={() => alert('Forgot password feature coming soon!')}>
            Forgot password
          </button>
        </div>

        <button type="submit">Login</button>

        <div className='register-link'>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
