import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/Navbar/Style.css';
import CitySearch from '../../pages/Location_Data/CitySearch';
import SearchBar from '../../pages/Search_Data/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext'; // ✅ Cart Context
// import ProviderList from "../../pages/ProviderList/index";

function Navbar() {
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const navigate = useNavigate();
  const moreRef = useRef(null);
  const settingsRef = useRef(null);
  const notificationRef = useRef(null);

  const { cart } = useCart(); // ✅ use cart from context
  const provider = JSON.parse(localStorage.getItem("loggedInProvider"));
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setShowNotifications([
      { id: 1, message: 'Booking confirmed for 1st July.', read: false },
      { id: 2, message: 'AC Repair offer: 15% off!', read: true }
    ]);
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !moreRef.current?.contains(event.target) &&
        !settingsRef.current?.contains(event.target) &&
        !notificationRef.current?.contains(event.target)
      ) {
        setShowMore(false);
        setShowSettings(false);
        setShowNotifDropdown(false);
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
    <nav className={`navbar navbar-expand-lg easeup-navbar ${theme}`}>
      <div className="container-fluid">
        <Link className="navbar-brand logo-text" to="/home">EaseUp Services</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>

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

          <div className="d-flex align-items-center gap-2 me-3">
            <CitySearch />
            <SearchBar />
                  {/* <ProviderList /> */}
          </div>

          <div className="navbar-icons d-flex align-items-center gap-3 position-relative">
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline-secondary"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <div ref={notificationRef} className="position-relative">
              <button className="notification-button" onClick={() => setShowNotifDropdown(!showNotifDropdown)}>
                <FontAwesomeIcon icon={faBell} className="nav-icon" />
                {showNotifications.some(n => !n.read) && <span className="notification-dot" />}
              </button>
              {showNotifDropdown && (
                <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ right: 0 }}>
                  {showNotifications.length === 0 ? (
                    <p className="dropdown-item">No new notifications</p>
                  ) : (
                    showNotifications.map(n => (
                      <div key={n.id} className={`dropdown-item ${n.read ? '' : 'fw-bold text-primary'}`}>
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" className="position-relative text-dark fs-5">
              <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/profile" className="text-dark fs-5">
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
            </Link>

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
