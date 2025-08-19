// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // State to manage the theme, defaults to 'dark'
    const [theme, setTheme] = useState(() => {
        // Retrieve theme from local storage on initial load
        return localStorage.getItem('theme') || 'dark';
    });

    // Effect to update the body class and local storage when the theme changes
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Function to toggle between light and dark mode
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};