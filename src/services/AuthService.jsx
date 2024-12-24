import api from "@/api/api.jsx";

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await api.post(`/users/register`, userData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        throw new Error(errorMessage); // Throw a proper error for the frontend
    }
};

// Login user
export const loginUser = async (email, password) => {
    try {
        const response = await api.post(`/users/login`, { email, password });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed!";
        throw new Error(errorMessage);
    }
};

// Get the user profile
export const getUserProfile = async () => {
    try {
        const response = await api.get('/users/profile');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch user profile.";
        throw new Error(errorMessage);
    }
};

// Get all users
export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch users.";
        throw new Error(errorMessage);
    }
};