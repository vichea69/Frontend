import { createContext, useState, useEffect } from "react";
import api from "@/api/api.jsx";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetch categories from backend
    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            console.log('Fetched Categories:', response.data.categories);
            setCategories(response.data.categories || []);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

// Add a new category
    const addCategory = async (newCategory) => {
        try {
            await api.post('/categories', newCategory);
            await fetchCategories(); // Refresh categories
        } catch (err) {
            console.error("Error adding category:", err);
        }
    };

    const updateCategory = async (id, updatedCategory) => {

        try {
            const response = await api.put(`/categories/${id}`, updatedCategory);
            setCategories((prev) =>
                prev.map((category) =>
                    category._id === id ? response.data.category : category
                )
            );
            console.log('Category Updated:', response.data.category);
        } catch (err) {
            console.error("Error updating category:", err);

        }
    };

    // Delete a category
    const deleteCategory = async (id) => {
       console.log(id)
        try {
            await api.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((category) => category._id !== id));
            console.log('Category Deleted:', id);
        } catch (err) {
            console.error("Error deleting category:", err);
            console.log("Error deleting category:", err);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, loading, addCategory , updateCategory, deleteCategory , fetchCategories}}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;