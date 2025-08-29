import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ServiceProvider from "../../../ServicesProvider/ServiceProvider";
import InteractiveStarRating from "../../../components/InteractiveStarRating";
import { getUserBookings, updateBookingStatus } from "../../../API/BookingApi";
import "./Style.css";

const BookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  // ⚠️ Replace with logged-in user ID from context/auth/localStorage
  const userId = localStorage.getItem("userId");

  // ✅ Wrap loadBookings in useCallback to avoid ESLint warnings
  const loadBookings = useCallback(async () => {
    try {
      if (!userId) {
        setBookings([]);
        return;
      }
      const result = await getUserBookings(userId);
      if (result?.success) {
        setBookings(result.bookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("❌ Error loading bookings:", err);
      setBookings([]);
    }
  }, [userId]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]); // ✅ no ESLint warning now

  const handleClearBookings = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all bookings?"
    );
    if (confirmed) {
      // 🔥 If backend supports delete endpoint, call it here
      setBookings([]);
      setPopupMessage("✅ All bookings have been cleared.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleRateService = (index, value) => {
    const ratedBooking = bookings[index];
    if (ratedBooking?.serviceName) {
      setFeedbacks((prev) => ({ ...prev, [index]: true }));
      setPopupMessage(
        `⭐ Thank you for rating "${ratedBooking.serviceName}" ${value} stars!`
      );
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const result = await updateBookingStatus(bookingId, status);
      if (result?.success) {
        setPopupMessage(`✅ Booking status updated to ${status}`);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
        loadBookings(); // reload
      }
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  const renderLocation = (location) => {
    if (!location) return "Address not provided";
    if (typeof location === "string") return location;
    const { house, landmark, city, state, pincode } = location;
    const parts = [house, landmark, city, state, pincode].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Address not provided";
  };

  return (
    <div className="booking-status-container">
      <div className="booking-status-header">
        <h2>Your Booking Status</h2>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">{popupMessage}</div>
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <>
          <div className="clear-button-container">
            <button
              className="clear-bookings-btn"
              onClick={handleClearBookings}
            >
              🗑️ Clear All Bookings
            </button>
          </div>

          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking._id} className="booking-item">
                <h3>{booking?.serviceName || "Unknown Service"}</h3>
                <p>
                  <strong>Plan:</strong> {booking?.plan}
                </p>
                <p>
                  <strong>Price:</strong> ₹{booking?.price}
                </p>
                <p>
                  <strong>Date:</strong> {booking?.date}
                </p>
                <p>
                  <strong>Location:</strong> {renderLocation(booking.location)}
                </p>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {booking?.method || "Not selected"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      booking.status === "Confirmed"
                        ? "status-confirmed"
                        : booking.status === "Cancelled"
                        ? "status-cancelled"
                        : "status-pending"
                    }
                  >
                    {booking.status || "Pending"}
                  </span>
                </p>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "currentBooking",
                      JSON.stringify(booking)
                    );
                    navigate("/details", { state: { service: booking } });
                  }}
                >
                  📄 View Details
                </button>

                {/* ✅ Update status buttons */}
                <div className="update-status">
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "Confirmed")}
                  >
                    ✅ Confirm
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "Cancelled")}
                  >
                    ❌ Cancel
                  </button>
                </div>

                {booking.providerId ? (
                  <>
                    <div className="provider-details">
                      <h4>👤 Assigned Provider</h4>
                      {booking.providerId?.image && (
                        <img
                          src={booking.providerId.image}
                          alt={booking.providerId.name}
                          className="provider-photo"
                        />
                      )}
                      <p>
                        <strong>Name:</strong> {booking.providerId.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {booking.providerId.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {booking.providerId.email}
                      </p>
                    </div>
                    <ServiceProvider provider={booking.providerId} />
                  </>
                ) : (
                  <p>
                    <em>No provider assigned yet.</em>
                  </p>
                )}

                <div className="rate-service">
                  <p>
                    <strong>Rate this service:</strong>
                  </p>
                  <InteractiveStarRating
                    onRate={(value) => handleRateService(index, value)}
                  />
                  {feedbacks[index] && (
                    <p className="thank-you-message">
                      Thank you for your feedback!
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default BookingStatus;
