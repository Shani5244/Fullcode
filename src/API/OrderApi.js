// src/API/BookingApi.js
import apiClient from "./apiClient";

// ✅ Create booking
export const createBooking = async (data) => {
  try {
    const response = await apiClient.post("/bookings/create", data);
    return response.data;
  } catch (error) {
    console.error("Create Booking API error:", error.message);
    return null;
  }
};

// ✅ Get all bookings for a user
export const getUserBookings = async (userId) => {
  try {
    const response = await apiClient.get(`/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get User Bookings API error:", error.message);
    return null;
  }
};

// ✅ Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await apiClient.put(`/bookings/update/${bookingId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Update Booking Status API error:", error.message);
    return null;
  }
};

// ✅ Cancel booking
export const cancelBooking = async (bookingId) => {
  try {
    const response = await apiClient.delete(`/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Cancel Booking API error:", error.message);
    return null;
  }
};
