import { createContext, useContext, useState } from "react";

// Create the Cart Contexet
export const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);


    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id);
            const quantityToAdd = product.quantity || 1; // Default to 1 if quantity is not provided

            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: quantityToAdd }];
        });
    };


    const removeFromCart = (productId) => {
        setCartItems((prevCart) => prevCart.filter((item) => item._id !== productId));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

