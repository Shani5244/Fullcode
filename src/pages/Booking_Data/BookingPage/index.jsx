// src/pages/BookingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  createBooking,
  getUserBookings,
  updateBookingStatus,
  cancelBooking,
} from "../../../API/OrderApi"; // import all APIs

const BookingPage = ({ selectedService, userId }) => {
  const navigate = useNavigate();

  // 👉 Create booking
  const handleBooking = async () => {
    if (!selectedService || !userId) {
      alert("Service or User ID missing!");
      return;
    }

    const newBooking = {
      userId,
      service: selectedService.name,
      price: selectedService.price || 500,
      status: "Confirmed",
      time: new Date().toISOString(),
    };

    const response = await createBooking(newBooking);

    if (response) {
      alert("Booking Confirmed!");
      navigate("/home");
    } else {
      alert("Booking failed. Please try again.");
    }
  };

  // 👉 Get all bookings of a user
  const handleGetBookings = async () => {
    const bookings = await getUserBookings(userId);
    console.log("User bookings:", bookings);
    alert(`Found ${bookings?.length || 0} bookings in your history`);
  };

  // 👉 Update booking status
  const handleUpdateBooking = async (bookingId, status) => {
    const updated = await updateBookingStatus(bookingId, status);
    console.log("Updated booking:", updated);
    alert(`Booking ${bookingId} updated to ${status}`);
  };

  // 👉 Cancel booking
  const handleCancelBooking = async (bookingId) => {
    const result = await cancelBooking(bookingId);
    console.log("Cancel result:", result);
    alert(`Booking ${bookingId} cancelled`);
  };

  return (
    <div className="booking-page">
      <h2>Book: {selectedService?.name || "Service"}</h2>
      <p>Price: ₹{selectedService?.price || 500}</p>

      {/* Create Booking */}
      <button onClick={handleBooking} className="btn btn-success">
        Book Now
      </button>

      {/* Get Bookings */}
      <button
        onClick={handleGetBookings}
        className="btn btn-info"
        style={{ marginLeft: "10px" }}
      >
        My Bookings
      </button>

      {/* Example Update/Cancel (replace bookingId with actual ID from DB) */}
      <button
        onClick={() => handleUpdateBooking("BOOKING_ID_HERE", "Completed")}
        className="btn btn-warning"
        style={{ marginLeft: "10px" }}
      >
        Mark Completed
      </button>

      <button
        onClick={() => handleCancelBooking("BOOKING_ID_HERE")}
        className="btn btn-danger"
        style={{ marginLeft: "10px" }}
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingPage;
