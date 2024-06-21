import React, { useState } from 'react';
import { login, register } from './authService';

function Auth({ onAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async () => {
        try {
            const data = isLogin ? await login(username, password) : await register(username, password);
            onAuth(data);
        } catch (error) {
            alert('Authentication failed');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleAuth}>{isLogin ? 'Login' : 'Register'}</button>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
}

export default Auth;