/**
 * Authentication Context
 * 
 * Manages global authentication state using React Context API
 * Handles login, register, logout, and JWT token management
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

// API Base URL - Update this to match your backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Custom hook to use Auth Context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/**
 * Auth Provider Component
 * Wraps the app and provides authentication state and functions
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Initialize auth state from localStorage on mount
     */
    useEffect(() => {
        const initAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));

                    // Set default axios header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                }
            } catch (err) {
                console.error('Error initializing auth:', err);
                // Clear invalid data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    /**
     * Register new user
     * @param {Object} userData - User registration data (name, email, password)
     * @returns {Promise<Object>} Response data
     */
    const register = async (userData) => {
        try {
            setError(null);
            setLoading(true);

            console.log('🔍 Sending registration data:', userData);
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            console.log('✅ Registration response:', response.data);

            if (response.data.success) {
                const { token: newToken, user: newUser } = response.data;

                // Store in state
                setToken(newToken);
                setUser(newUser);

                // Store in localStorage
                localStorage.setItem('token', newToken);
                localStorage.setItem('user', JSON.stringify(newUser));

                // Set default axios header
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                return response.data;
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Login existing user
     * @param {Object} credentials - Login credentials (email, password)
     * @returns {Promise<Object>} Response data
     */
    const login = async (credentials) => {
        try {
            setError(null);
            setLoading(true);

            const response = await axios.post(`${API_URL}/auth/login`, credentials);

            if (response.data.success) {
                const { token: newToken, user: newUser } = response.data;

                // Store in state
                setToken(newToken);
                setUser(newUser);

                // Store in localStorage
                localStorage.setItem('token', newToken);
                localStorage.setItem('user', JSON.stringify(newUser));

                // Set default axios header
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                return response.data;
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout user
     * Clears token and user data from state and localStorage
     */
    const logout = () => {
        // Clear state
        setToken(null);
        setUser(null);
        setError(null);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear axios default header
        delete axios.defaults.headers.common['Authorization'];
    };

    /**
     * Check if user is authenticated
     * @returns {boolean} True if user is logged in
     */
    const isAuthenticated = () => {
        return !!token && !!user;
    };

    /**
     * Check if user is admin
     * @returns {boolean} True if user has admin role
     */
    const isAdmin = () => {
        return user?.role === 'admin';
    };

    /**
     * Update user data
     * @param {Object} updatedUser - Updated user data
     */
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    /**
     * Clear error
     */
    const clearError = () => {
        setError(null);
    };

    // Context value
    const value = {
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        updateUser,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
