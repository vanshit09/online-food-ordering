import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
<<<<<<< HEAD
=======
  const API_BASE = 'http://localhost:5000';
>>>>>>> f5a76c9 (final commit)

  useEffect(() => {
    // Check if user is logged in on app start
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
<<<<<<< HEAD
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
=======

    // Globally add Authorization header to all fetch calls
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      try {
        const url = typeof input === 'string' ? input : input.url;
        const isApiCall = typeof url === 'string' && url.startsWith(API_BASE + '/api');
        if (token && isApiCall) {
          const headers = new Headers(init && init.headers ? init.headers : {});
          if (!headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          init = { ...(init || {}), headers };
        }
        return await originalFetch(input, init);
      } catch (err) {
        return Promise.reject(err);
      }
    };

    setLoading(false);
    // Cleanup not strictly necessary for SPA lifetime
    // return () => { window.fetch = originalFetch; };
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
>>>>>>> f5a76c9 (final commit)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

<<<<<<< HEAD
      if (data.message === 'Login successful' && data.accessToken) {
        const userData = {
          id: data.user?.id,
          name: data.user?.name,
          email: data.user?.email
        };
        
        setUser(userData);
        setToken(data.accessToken);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: data.message };
=======
      if (response.ok && data.token && data.user) {
        const userData = {
          id: data.user?._id || data.user?.id,
          name: data.user?.fullname || data.user?.name,
          email: data.user?.email,
          role: data.user?.role || 'customer'
        };
        setUser(userData);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: data.message || 'Login successful', user: userData };
>>>>>>> f5a76c9 (final commit)
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

<<<<<<< HEAD
  const register = async (fullname, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
=======
  const register = async (fullname, email, password, role = 'customer') => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
>>>>>>> f5a76c9 (final commit)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify({ fullname, email, password }),
=======
        body: JSON.stringify({ fullname, email, password, role }),
>>>>>>> f5a76c9 (final commit)
      });

      const data = await response.json();

<<<<<<< HEAD
      if (data.message === 'Registration successful' && data.accessToken) {
        const userData = {
          id: data.user?.id,
          name: data.user?.name,
          email: data.user?.email
        };
        
        setUser(userData);
        setToken(data.accessToken);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || 'Registration failed' };
=======
      if (response.ok && data.token && data.user) {
        const userData = {
          id: data.user?._id || data.user?.id,
          name: data.user?.fullname || data.user?.name,
          email: data.user?.email,
          role: data.user?.role || 'customer'
        };
        setUser(userData);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: data.message || 'Registration successful', user: userData };
      } else {
        return { success: false, message: data.error || data.message || 'Registration failed' };
>>>>>>> f5a76c9 (final commit)
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
