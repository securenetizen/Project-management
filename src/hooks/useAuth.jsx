import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocal ? 'http://localhost:5001/api' : '/api';
const TOKEN_KEY = 'pm_token';
const USER_KEY = 'pm_user';

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = localStorage.getItem(USER_KEY);
        return stored ? JSON.parse(stored) : null;
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const login = useCallback(async (username, password) => {
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) return { success: false, error: data.error };

            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            setCurrentUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: 'Server error' };
        }
    }, []);

    const logout = useCallback(() => {
        setCurrentUser(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }, []);

    const fetchUsers = useCallback(async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.role === 'Admin') {
            fetchUsers();
        }
    }, [currentUser, fetchUsers]);

    const addUser = useCallback(async (userData) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(prev => [...prev, data]);
                return data;
            }
        } catch (err) {
            console.error('Error adding user:', err);
        }
    }, []);

    const updateUser = useCallback(async (id, updates) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(prev => prev.map(u => u.id === id ? data : u));
                if (currentUser?.id === id) {
                    setCurrentUser(data);
                    localStorage.setItem(USER_KEY, JSON.stringify(data));
                }
                return data;
            }
        } catch (err) {
            console.error('Error updating user:', err);
        }
    }, [currentUser]);

    const deleteUser = useCallback(async (id) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setUsers(prev => prev.filter(u => u.id !== id));
                return true;
            }
        } catch (err) {
            console.error('Error deleting user:', err);
        }
        return false;
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            users,
            login,
            logout,
            addUser,
            updateUser,
            deleteUser,
            isAdmin: currentUser?.role === 'Admin',
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
