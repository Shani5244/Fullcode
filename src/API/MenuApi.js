import apiClient from "./apiClient"; // axios/fetch wrapper

// ✅ Get all menu items
export const getMenu = async () => {
  try {
    const response = await apiClient.get("/menu");
    return response.data || [];
  } catch (error) {
    console.error("Get Menu API error:", error.message);
    return [];
  }
};

// ✅ Add new menu item
export const addMenuItem = async (data) => {
  try {
    const response = await apiClient.post("/menu", data);
    return response.data || null;
  } catch (error) {
    console.error("Add Menu Item API error:", error.message);
    return null;
  }
};

// ✅ Update menu item
export const updateMenuItem = async (id, data) => {
  try {
    const response = await apiClient.put(`/menu/${id}`, data);
    return response.data || null;
  } catch (error) {
    console.error("Update Menu Item API error:", error.message);
    return null;
  }
};

// ✅ Delete menu item
export const deleteMenuItem = async (id) => {
  try {
    const response = await apiClient.delete(`/menu/${id}`);
    return response.data || null;
  } catch (error) {
    console.error("Delete Menu Item API error:", error.message);
    return null;
  }
};
