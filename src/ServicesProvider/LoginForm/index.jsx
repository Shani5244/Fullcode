import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'; // Optional if you have styling

const ProviderLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const providers = JSON.parse(localStorage.getItem('serviceProviders')) || [];
    const found = providers.find(p => p.email === email && p.password === password);

    if (found) {
      localStorage.setItem('loggedInProvider', JSON.stringify(found));
      navigate('/'); // ✅ Redirect to Home
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="form-container">
      <h2>Provider Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/provider-register')}
          // style={{ color: 'blue', cursor: 'pointer' }}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default ProviderLogin;
