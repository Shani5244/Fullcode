// src/API/UserRegisterApi.js
import apiClient from './apiClient';

export const UserRegister = async (formData) => {
  try {
    const response = await apiClient.post('/user/register', formData);
    return response.data; // ✅ Return only actual data
  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', {
        status: error.response.status,
        message: error.response.statusText,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('❌ No response received:', error.request);
    } else {
      console.error('❌ Unexpected error:', error.message);
    }
    throw error;
  }
};
