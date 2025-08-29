// src/pages/PaymentOption.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import providers from '../../../Datas/ProvidersData';
import './Style.css';

const PaymentOption = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [matchedProvider, setMatchedProvider] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentBooking');
      if (!stored) {
        alert("❌ No booking in progress.");
        navigate('/');
        return;
      }

      const parsed = JSON.parse(stored);

      // Basic validation
      if (!parsed?.id || !parsed?.name || !parsed?.plan || !parsed?.price) {
        throw new Error("❌ Incomplete booking data.");
      }

      setBooking(parsed);

      const provider = providers.find((p) => p.id === parsed.id);
      setMatchedProvider(provider || null);

      // Set default method if stored
      if (parsed.method) {
        setSelectedMethod(parsed.method);
      }

    } catch (err) {
      console.error("❌ Booking data error:", err);
      alert("Booking data is corrupted. Please start again.");
      localStorage.removeItem('currentBooking');
      navigate('/');
    }
  }, [navigate]);

  const handleConfirmPayment = () => {
    if (!selectedMethod) {
      alert("⚠️ Please select a payment method.");
      return;
    }

    const finalBooking = {
      ...booking,
      method: selectedMethod,
      status: 'Confirmed',
      date: new Date().toLocaleString(),
      provider: matchedProvider,
    };

    // Save to history
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    history.push(finalBooking);
    localStorage.setItem('bookingHistory', JSON.stringify(history));
    localStorage.removeItem('currentBooking');

    alert(`✅ Payment successful via ${selectedMethod}`);
    navigate('/booking-status');
  };

  const handleCancel = () => {
    localStorage.removeItem('currentBooking');
    alert("❌ Booking cancelled.");
    navigate('/');
  };

  if (!booking) return <div className="loading">⏳ Loading booking details...</div>;

  return (
    <div className="payment-container">
      <h2>🧾 Complete Your Payment</h2>

      <p><strong>Service:</strong> {booking.name}</p>
      <p><strong>Plan:</strong> {booking.plan}</p>
      <p><strong>Price:</strong> ₹{booking.price}</p>

      <h4>Select Payment Method:</h4>
      <div className="payment-options">
        {['Cash on Delivery', 'UPI', 'Card'].map((method) => (
          <button
            key={method}
            className={`payment-button ${selectedMethod === method ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method)}
          >
            {method}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        <button className="confirm-button" onClick={handleConfirmPayment}>
          ✅ Confirm Payment
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          ❌ Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentOption;
