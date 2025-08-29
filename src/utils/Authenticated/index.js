// src/utils/Authenticated.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Authenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access_Token = Cookies.get('access_token');

    if (access_Token) {
      // Use the route path, not the physical file pathqs3dwsw2ewqa
      navigate('/Home', { replace: true });
    }
  }, [navigate]);

  return null;
};

export default Authenticated;
