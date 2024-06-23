const defaultUser = {
    username: 'admin',
    isAdmin: true,
};

const defaultToken = 'mock-token';

localStorage.setItem('token', defaultToken);
localStorage.setItem('user', JSON.stringify(defaultUser));

export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                resolve({ token: defaultToken, user: defaultUser });
            } else {
                reject(new Error('Login failed. Please check your credentials.'));
            }
        }, 1000);
    });
};

export const register = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ token: defaultToken, user: defaultUser });
        }, 1000);
    });
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const fetchUserData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(defaultUser);
        }, 1000);
    });
};
