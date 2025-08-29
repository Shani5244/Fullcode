// src/API/providerApi.js
// import { BASE_URL } from '../Config/config';
import apiClient from './apiClient';

export const ProviderRegister = async (data) => {
  try {
    const response = await apiClient.post(`/providers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Registration failed");
    }

    return result;
  } catch (error) {
    console.error("Registration API error:", error.message);
    return null;
  }
};
