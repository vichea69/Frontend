/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import api from "@/api/api.jsx";

export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch a product by ID
    const fetchProductById = async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data.product; // Use singular 'product' if backend responds as { product: {...} }
        } catch (err) {
            console.error("Error fetching product by ID:", err.message);
            throw err;
        }
    };

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            console.log("Fetched products:", response.data.products);
            setProducts(response.data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData) => {
        try {
            // Validation (optional but recommended)
            if (!productData.has("name") || !productData.has("description") || !productData.has("price") || !productData.has("category") || !productData.has("image")) {
                throw new Error("All fields are required to add a product.");
            }

            // API Request
            const response = await api.post("/products", productData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const newProduct = response.data.product; // Ensure backend response is structured correctly

            // Update State
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            console.log("Product added successfully:", newProduct); // Debug log

            return newProduct;
        } catch (err) {
            console.error("Error adding product:", err.response?.data || err.message);
            throw new Error(err.response?.data?.message || "Failed to add product. Please try again.");
        }
    };

    // Update a product
    const updateProduct = async (id, updatedProduct) => {
        try {
            const response = await api.put(`/products/${id}`, updatedProduct, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const updatedData = response.data.product; // Use singular 'product'
            setProducts((prev) =>
                prev.map((product) =>
                    product._id === id ? updatedData : product
                )
            );
            console.log("Product Updated:", updatedData);
        } catch (err) {
            console.error("Error updating product:", err.message);
            throw err;
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts((prev) => prev.filter((product) => product._id !== id));
            console.log("Product Deleted:", id);
        } catch (err) {
            console.error("Error deleting product:", err.message);
            throw err;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                fetchProducts,
                fetchProductById,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;