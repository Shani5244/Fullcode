// src/pages/BookingHistory.jsx
import React, { useEffect, useState } from "react";
import { getBookingHistory } from "../../../API/BookingHistoryApi"; // import API function
import "./Style.css";

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch booking history from API
  const fetchBookingHistory = async () => {
    setLoading(true);
    const bookings = await getBookingHistory();
    setHistory(bookings);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  // ✅ Clear booking history locally (API not implemented for delete)
  const clearHistory = () => {
    setHistory([]);
    alert("Booking history cleared.");
    // If you have backend delete API, call it here
  };

  return (
    <div className="history-container">
      <h2>Your Booking History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p className="no-history">No bookings yet.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index} className="history-item">
                <p>
                  <strong>Service:</strong> {item.serviceName}
                </p>
                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Payment:</strong> {item.paymentMethod}
                </p>
              </li>
            ))}
          </ul>
          <button className="clear-btn" onClick={clearHistory}>
            Clear History
          </button>
        </>
      )}
    </div>
  );
};

export default BookingHistory;
