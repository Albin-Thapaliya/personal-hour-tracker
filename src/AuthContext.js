import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [authError, setAuthError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (userData) => {
        setLoading(true);
        setAuthError(null);
        try {
            // Simulate an API call
            const response = await fakeAuthService(userData);
            setUser(response);
        } catch (error) {
            setAuthError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setAuthError(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, authError, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Test Authentication service for demonstration
const fakeAuthService = (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.username === 'admin' && userData.password === 'password') {
                resolve({ username: 'admin', isAdmin: true });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
};
