import React, { useEffect, useState } from 'react';
import '../../pages/BookingHistory/Style.css';

const BookingHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookingHistory');
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      } catch (error) {
        console.error('Error parsing booking history:', error);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('bookingHistory');
    setHistory([]);
    alert("Booking history cleared.");
  };

  return (
    <div className="history-container">
      <h2>Your Booking History</h2>

      {history.length === 0 ? (
        <p className="no-history">No bookings yet.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index} className="history-item">
                <p><strong>Service:</strong> {item.serviceName}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Payment:</strong> {item.paymentMethod}</p>
              </li>
            ))}
          </ul>
          <button className="clear-btn" onClick={clearHistory}>Clear History</button>
        </>
      )}
    </div>
  );
};

export default BookingHistory;
