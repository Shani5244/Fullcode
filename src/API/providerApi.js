import apiClient from "./apiClient";

// ✅ Get provider list
export const getProviderList = async () => {
  try {
    const response = await apiClient.get("/provider-listing/list");
    return response.data; // axios me data yahi hota hai
  } catch (error) {
    console.error("Error fetching provider list:", error);
    return null;
  }
};
