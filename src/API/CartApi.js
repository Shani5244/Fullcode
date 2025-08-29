// src/API/cartApi.js
import apiClient from "./apiClient"; // axios/fetch wrapper

// ✅ Add item to cart
export const addToCart = async (data) => {
  try {
    const response = await apiClient.post("/cart/add", data);
    if (response.data.success) return response.data.cart;
    throw new Error(response.data.message || "Failed to add item to cart");
  } catch (error) {
    console.error("Add to Cart API error:", error.message);
    return null;
  }
};

// ✅ Get user cart
export const getCart = async (userId) => {
  try {
    const response = await apiClient.get(`/cart/${userId}`);
    if (response.data.success) return response.data.cart;
    throw new Error(response.data.message || "Failed to fetch cart");
  } catch (error) {
    console.error("Get Cart API error:", error.message);
    return { items: [] };
  }
};

// ✅ Update cart item quantity
export const updateCartItem = async (data) => {
  try {
    const response = await apiClient.put("/cart/update", data);
    if (response.data.success) return response.data.cart;
    throw new Error(response.data.message || "Failed to update cart item");
  } catch (error) {
    console.error("Update Cart Item API error:", error.message);
    return null;
  }
};

// ✅ Remove item from cart
export const removeCartItem = async (data) => {
  try {
    const response = await apiClient.put("/cart/remove", data); // or POST if backend uses POST
    if (response.data.success) return response.data.cart;
    throw new Error(response.data.message || "Failed to remove cart item");
  } catch (error) {
    console.error("Remove Cart Item API error:", error.message);
    return null;
  }
};

// ✅ Clear entire cart
export const clearCart = async (userId) => {
  try {
    const response = await apiClient.delete(`/cart/clear/${userId}`);
    if (response.data.success) return response.data.cart;
    throw new Error(response.data.message || "Failed to clear cart");
  } catch (error) {
    console.error("Clear Cart API error:", error.message);
    return { items: [] };
  }
};
