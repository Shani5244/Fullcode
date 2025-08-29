import apiClient from "./apiClient";

// ✅ Send manual message (from user/provider)
export const sendMessage = async (data) => {
  try {
    const response = await apiClient.post("/livechat/send", data);
    return response.data;
  } catch (error) {
    console.error("Send Message API error:", error.message);
    return null;
  }
};

// ✅ Send system auto-message
export const sendAutoMessage = async (data) => {
  try {
    const response = await apiClient.post("/livechat/auto", data);
    return response.data;
  } catch (error) {
    console.error("Send Auto Message API error:", error.message);
    return null;
  }
};

// ✅ Get LiveChat history
export const getChatHistory = async (userId, providerId) => {
  try {
    const response = await apiClient.get(`/livechat/${userId}/${providerId}`);
    return response.data;
  } catch (error) {
    console.error("Get Chat History API error:", error.message);
    return null;
  }
};
