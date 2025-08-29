import apiClient from "./apiClient"; // axios instance

// ✅ Create new earnings report
export const createEarningsReport = async (data) => {
  try {
    const response = await apiClient.post("/earnings/create", data);

    if (response.data.success) {
      return response.data.report;
    } else {
      throw new Error(response.data.message || "Failed to create report");
    }
  } catch (error) {
    console.error("Create Earnings Report API error:", error.message);
    return null;
  }
};

// ✅ Get all earnings reports (Admin use)
export const getAllReports = async () => {
  try {
    const response = await apiClient.get("/earnings");

    if (response.data.success) {
      return response.data.reports;
    } else {
      throw new Error(response.data.message || "Failed to fetch reports");
    }
  } catch (error) {
    console.error("Get All Reports API error:", error.message);
    return [];
  }
};

// ✅ Get report by provider
export const getReportByProvider = async (providerId) => {
  try {
    const response = await apiClient.get(`/earnings/provider/${providerId}`);

    if (response.data.success) {
      return response.data.reports;
    } else {
      throw new Error(response.data.message || "Failed to fetch provider report");
    }
  } catch (error) {
    console.error("Get Report By Provider API error:", error.message);
    return [];
  }
};
