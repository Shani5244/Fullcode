// src/API/bookingApi.js
import apiClient from "./apiClient"; // axios/fetch wrapper

// ✅ Fetch booking history of logged-in user
export const getBookingHistory = async () => {
  try {
    const response = await apiClient.get("/bookings/history");

    // If backend returns success
    if (response.data.success) {
      return response.data.bookings;
    } else {
      throw new Error(response.data.message || "Failed to fetch bookings");
    }
  } catch (error) {
    console.error("Booking history API error:", error.message);
    return [];
  }
};
