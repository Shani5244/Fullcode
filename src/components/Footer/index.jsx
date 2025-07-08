import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="uc-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h2>EUS</h2>
          <p>EaseUp Services</p>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/About">About us</Link></li>
              {/* <li><Link to="/">Investor Relations</Link></li> */}
              <li><Link to="/Terms_Conditions">Terms & Conditions</Link></li>
              <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
              {/* <li><Link to="/">Anti-discrimination policy</Link></li> */}
              {/* <li><Link to="/">ESG Impact</Link></li> */}
              <li><Link to="/">Careers</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For customers</h4>
            <ul>
              <li>EaseUp Services Reviews</li>
              <li>Categories near you</li>
              <li>Contact us</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For professionals</h4>
            <ul>
              <li><Link to="/Register">Register as a professional</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Social links</h4>
            <div className="social-icons">
              <FaTwitter />
              <FaFacebookF />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
            <div className="app-links">
              {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Store_logo.svg" alt="App Store" /> */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        {/* <p>© 2025 EaseUp Services Pvt. Ltd.</p> */}
        {/* <a href="#" className="scroll-to-top">↑ Back to Top</a> */}
      </div>
    </footer>
  );
};

export default Footer;
