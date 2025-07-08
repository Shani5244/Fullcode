import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import providers from '../../Datas/ProvidersData';
import './Style.css';

const PaymentOption = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [matchedProvider, setMatchedProvider] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentBooking');
      if (stored) {
        const parsed = JSON.parse(stored);

        if (!parsed.id || !parsed.name || !parsed.plan || !parsed.price) {
          throw new Error("Incomplete booking data.");
        }

        const provider = providers.find(p => p.id === parsed.id); // Match provider by ID

        setBooking(parsed);
        setMatchedProvider(provider || null);
        setSelectedMethod(parsed.method || '');
      } else {
        alert("❌ No booking in progress.");
        navigate('/');
      }
    } catch (err) {
      alert("❌ Booking data is corrupted. Please start again.");
      console.error(err);
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
      provider: matchedProvider || null, // ✅ Save for later display
    };

    const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    history.push(finalBooking);
    localStorage.setItem('bookingHistory', JSON.stringify(history));
    localStorage.removeItem('currentBooking');

    alert(`✅ Payment Successful via ${selectedMethod}`);
    navigate('/booking-status');
  };

  const handleCancel = () => {
    localStorage.removeItem('currentBooking');
    alert("❌ Booking cancelled.");
    navigate('/');
  };

  if (!booking) return <p>⏳ Loading booking...</p>;

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>

      <p><strong>Service:</strong> {booking.name}</p>
      <p><strong>Plan:</strong> {booking.plan}</p>
      <p><strong>Price:</strong> ₹{booking.price}</p>

      <h4>Select Payment Method:</h4>
      <div className="payment-options">
        {['Cash on Delivery', 'UPI', 'Card'].map((method) => (
          <button
            key={method}
            className={selectedMethod === method ? 'selected' : ''}
            onClick={() => setSelectedMethod(method)}
          >
            {method}
          </button>
        ))}
      </div>

      {/* ❌ Do NOT show provider info here */}

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
