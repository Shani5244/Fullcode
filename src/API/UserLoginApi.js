import apiClient from './apiClient';

export const UserLogin = async (data) => {
  try {
    const response = await apiClient.post('/user/login', data);
    console.log("✅ Login successful:", response);
    return response;
  } catch (error) {
    console.error("❌ Login API error:", error.responseData?.message || error.message);
    return { error: true, message: error.responseData?.message || "Login failed" };
  }
};
