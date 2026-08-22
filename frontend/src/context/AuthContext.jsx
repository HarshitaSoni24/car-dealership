import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, savedVehicleApi } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUsername = localStorage.getItem('username');
    if (token && storedRole && storedUsername) {
      setUser({ username: storedUsername, role: storedRole });
      fetchSavedVehicles();
    }
    setLoading(false);
  }, [token]);

  const fetchSavedVehicles = async () => {
    try {
      const res = await savedVehicleApi.getMyGarage();
      setSavedVehicles(res.data.map(item => item.vehicle_id));
    } catch (err) {
      console.error('Failed to fetch saved vehicles', err);
    }
  };

  const login = async (username, password) => {
    const res = await authApi.login({ username, password });
    const { access_token, role } = res.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    setToken(access_token);
    setUser({ username, role });
    await fetchSavedVehicles();
    return res.data;
  };

  const register = async (username, email, password, role = 'user') => {
    return await authApi.register({ username, email, password, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
    setSavedVehicles([]);
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        token, 
        login, 
        register, 
        logout, 
        isAdmin: user?.role === 'admin', 
        loading,
        savedVehicles,
        fetchSavedVehicles
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);