import React from 'react';
import './Style.css';

const Terms = () => {
  return (
    <div className="static-page">
      <h1>Terms and Conditions</h1>
      <p>By accessing this website, you agree to the following terms:</p>

      <ul>
        <li>Use of our services is at your own risk.</li>
        <li>You must be 18 years or older to use this platform.</li>
        <li>All bookings are subject to confirmation.</li>
        <li>We reserve the right to cancel or deny service at any time.</li>
        <li>Your information must be accurate and complete.</li>
      </ul>

      <p>Violation of these terms may result in suspension or termination of your account.</p>
    </div>
  );
};

export default Terms;
 