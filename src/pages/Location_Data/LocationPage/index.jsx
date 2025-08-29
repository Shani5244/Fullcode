// src/pages/LocationPage.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationForm from '../LocationForm';

const LocationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Try from state first, fallback to tempBooking from localStorage
  const service = state?.service || JSON.parse(localStorage.getItem('tempBooking'));
  const selectedPlan = state?.selectedPlan || service?.plan;
  const selectedPrice = state?.selectedPrice || service?.price;

  useEffect(() => {
    const savedLocation = JSON.parse(localStorage.getItem('locationProfile'));

    // ✅ If location exists, skip form and go to payment
    if (savedLocation) {
      if (!service || !selectedPlan || !selectedPrice) {
        alert("❌ Booking info missing. Please select a service again.");
        navigate('/');
        return;
      }

      const booking = {
        name: service.name,
        plan: selectedPlan,
        price: selectedPrice,
        image: service.image,
        address: savedLocation,
        method: 'Not selected',
        status: 'Pending',
        timestamp: new Date().toLocaleString()
      };

      const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
      history.push(booking);
      localStorage.setItem('bookingHistory', JSON.stringify(history));

      navigate('/payment', { state: { fromBookNow: true } });
    }
  }, [navigate, service, selectedPlan, selectedPrice]);

  const handleLocationSubmit = (address) => {
    if (!service || !selectedPlan || !selectedPrice) {
      alert("❌ Booking details missing.");
      navigate('/');
      return;
    }

    const booking = {
      name: service.name,
      plan: selectedPlan,
      price: selectedPrice,
      image: service.image,
      address,
      method: 'Not selected',
      status: 'Pending',
      timestamp: new Date().toLocaleString()
    };

    const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    history.push(booking);
    localStorage.setItem('bookingHistory', JSON.stringify(history));

    localStorage.setItem('locationProfile', JSON.stringify(address));

    navigate('/payment', { state: { fromLocationForm: true } });
  };

  return (
    <div>
      <LocationForm onSuccess={handleLocationSubmit} />
    </div>
  );
};

export default LocationPage;
