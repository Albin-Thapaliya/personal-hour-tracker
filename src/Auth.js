import React, { useState } from 'react';
import { login, register } from './authService';
import './Auth.css';

function Auth({ onAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async () => {
        setLoading(true);
        setError('');
        try {
            const data = isLogin ? await login(username, password) : await register(username, password);
            onAuth(data);
        } catch (error) {
            setError('Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="input-field"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
            />
            <button
                onClick={handleAuth}
                disabled={!validateForm() || loading}
                className="auth-button"
            >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
            </button>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="switch-button"
            >
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Auth;
