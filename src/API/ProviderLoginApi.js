// import { BASE_URL } from "../Config/config"; // Correct relative import
import apiClient from './apiClient';

export const providerLogin = async (data) => {
  try {
    const response = await apiClient.post(`/provider/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Provider login failed");
    }

    return result;
  } catch (error) {
    console.error("Login API error:", error.message);
    return null;
  }
};
