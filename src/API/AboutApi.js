// src/API/aboutApi.js
import apiClient from "./apiClient"; // axios/fetch wrapper

// ✅ Fetch About info
export const getAbout = async () => {
  try {
    const response = await apiClient.get("/about"); // backend route

    if (response.data.success) {
      return response.data.about;
    } else {
      throw new Error(response.data.message || "Failed to fetch About info");
    }
  } catch (error) {
    console.error("Get About API error:", error.message);
    return null;
  }
};

// ✅ Update About info
export const updateAbout = async (data) => {
  try {
    const response = await apiClient.put("/about/update", data);

    if (response.data.success) {
      return response.data.about;
    } else {
      throw new Error(response.data.message || "Failed to update About info");
    }
  } catch (error) {
    console.error("Update About API error:", error.message);
    return null;
  }
};
