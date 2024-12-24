import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for username on page load
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setUser({ username });
        }
    }, []);

    // Function to log in a user
    const login = (username, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setUser({ username });
    };

    // Function to log out a user
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;