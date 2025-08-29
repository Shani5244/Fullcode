import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PaymentModal from "../PaymentOptions/index";
import { getMenu } from "../../../API/MenuApi"; // ✅ import API

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const items = await getMenu();
      setMenuItems(items);
    };
    fetchMenu();
  }, []);

  const handleBookNow = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <div className="menu-container">
        <div style={{ textAlign: "right" }}>
          <Link to="/booking-history" className="history-link">
            View Booking History
          </Link>
        </div>

        <h1 className="menu-title">Our Services</h1>
        <div className="menu-grid">
          {menuItems.length === 0 ? (
            <p>No services available at the moment.</p>
          ) : (
            menuItems.map((item) => (
              <div key={item._id} className="menu-card">
                <img src={item.image} alt={item.name} className="menu-image" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">₹{item.price}</p>
                <button className="book-btn" onClick={() => handleBookNow(item)}>
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedService && (
        <PaymentModal service={selectedService} onClose={closeModal} />
      )}
    </>
  );
};

export default Menu;
