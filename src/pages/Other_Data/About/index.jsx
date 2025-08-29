// src/pages/About/index.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAbout } from '../../../API/AboutApi'; // import API
import './Style.css';

const About = () => {
  const [about, setAbout] = useState({
    title: '',
    description: '',
    mission: '',
    vision: '',
    contactEmail: ''
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch About info from API
  const fetchAboutInfo = async () => {
    setLoading(true);
    const data = await getAbout();
    if (data) setAbout(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  if (loading) {
    return <p>Loading About Info...</p>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{about.title || 'About Us'}</h1>
      <p className="page-description">{about.description}</p>

      {about.mission && (
        <p>
          <strong>Mission:</strong> {about.mission}
        </p>
      )}
      {about.vision && (
        <p>
          <strong>Vision:</strong> {about.vision}
        </p>
      )}
      {about.contactEmail && (
        <p>
          <strong>Contact:</strong> {about.contactEmail}
        </p>
      )}

      <Link to="/" className="page-button">
        Go Home
      </Link>
    </div>
  );
};

export default About;
