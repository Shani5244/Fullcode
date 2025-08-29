import apiClient from "./apiClient"; // axios instance

// ✅ Create new request
export const createRequest = async (data) => {
  try {
    const response = await apiClient.post("/requests/create", data);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to create request");
    }
  } catch (error) {
    console.error("Create Request API error:", error.message);
    return null;
  }
};

// ✅ Get all requests for a provider
export const getProviderRequests = async (providerId) => {
  try {
    const response = await apiClient.get(`/requests/provider/${providerId}`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch provider requests");
    }
  } catch (error) {
    console.error("Get Provider Requests API error:", error.message);
    return [];
  }
};

// ✅ Update request status (accept/reject)
export const updateRequestStatus = async (requestId, status) => {
  try {
    const response = await apiClient.put(`/requests/update/${requestId}`, { status });

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to update request status");
    }
  } catch (error) {
    console.error("Update Request Status API error:", error.message);
    return null;
  }
};

// ✅ Get all requests of a user
export const getUserRequests = async (userId) => {
  try {
    const response = await apiClient.get(`/requests/user/${userId}`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch user requests");
    }
  } catch (error) {
    console.error("Get User Requests API error:", error.message);
    return [];
  }
};
