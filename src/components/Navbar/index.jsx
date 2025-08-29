import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/Navbar/Style.css';
import CitySearch from '../../pages/CitySearch';
import SearchBar from '../../pages/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faBell } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const moreRef = useRef(null);
  const settingsRef = useRef(null);
  const notificationRef = useRef(null);

  const provider = JSON.parse(localStorage.getItem("loggedInProvider"));

  // Mock notification setup
  useEffect(() => {
    setNotifications([
      { id: 1, message: 'Booking confirmed for 1st July.', read: false },
      { id: 2, message: 'AC Repair offer: 15% off!', read: true }
    ]);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !moreRef.current?.contains(event.target) &&
        !settingsRef.current?.contains(event.target) &&
        !notificationRef.current?.contains(event.target)
      ) {
        setShowMore(false);
        setShowSettings(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInProvider');
    alert('You have logged out');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg easeup-navbar">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand logo-text" to="/Home">EaseUp Services</Link>

        {/* Toggler */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Nav */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/Home">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>

            {/* More Dropdown */}
            <li className="nav-item dropdown" ref={moreRef}>
              <button className="nav-link dropdown-toggle btn btn-link" onClick={() => setShowMore(!showMore)}>
                More
              </button>
              {showMore && (
                <ul className="dropdown-menu show">
                  <li><Link className="dropdown-item" to="/services" onClick={() => setShowMore(false)}>Services</Link></li>
                  <li><Link className="dropdown-item" to="/contact" onClick={() => setShowMore(false)}>Contact</Link></li>
                  <li><Link className="dropdown-item" to="/menu" onClick={() => setShowMore(false)}>Menu</Link></li>
                  <li><Link className="dropdown-item" to="/profile" onClick={() => setShowMore(false)}>Profile</Link></li>
                </ul>
              )}
            </li>
          </ul>

          {/* Search */}
          <div className="d-flex align-items-center gap-2 me-3">
            <CitySearch />
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="navbar-icons d-flex align-items-center gap-3 position-relative">
            {/* Notification */}
            <div ref={notificationRef} className="position-relative">
              <button className="notification-button" onClick={() => setShowNotifications(!showNotifications)}>
                <FontAwesomeIcon icon={faBell} className="nav-icon" />
                {notifications.some(n => !n.read) && <span className="notification-dot" />}
              </button>
              {showNotifications && (
                <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ right: 0 }}>
                  {notifications.length === 0 ? (
                    <p className="dropdown-item">No new notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={`dropdown-item ${n.read ? '' : 'fw-bold text-primary'}`}>
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <Link to="/profile" className="text-dark fs-5">
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
            </Link>

            {/* Settings */}
            <div ref={settingsRef} className="position-relative">
              <button className="btn btn-link text-dark fs-5" onClick={() => setShowSettings(!showSettings)}>
                <FontAwesomeIcon icon={faGear} className="nav-icon" />
              </button>
              {showSettings && (
                <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ right: 0 }}>
                  <Link className="dropdown-item" to="/profile" onClick={() => setShowSettings(false)}>Profile</Link>
                  <Link className="dropdown-item" to="/services" onClick={() => setShowSettings(false)}>Services</Link>
                  <Link className="dropdown-item" to="/contact" onClick={() => setShowSettings(false)}>Contact</Link>
                  <Link className="dropdown-item" to="/menu" onClick={() => setShowSettings(false)}>Menu</Link>
                  <Link className="dropdown-item" to="/BookingStatus" onClick={() => setShowSettings(false)}>Booking Status</Link>
                  <Link className="dropdown-item" to="/SearchHistory" onClick={() => setShowSettings(false)}>Search History</Link>

                  {/* 📥 Provider Requests only shown when provider is logged in */}
                  {provider && (
                    <Link className="dropdown-item fw-bold text-primary" to="/provider/requests" onClick={() => setShowSettings(false)}>
                      📥 Provider Requests
                    </Link>
                  )}

                  <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
