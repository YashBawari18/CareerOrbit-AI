import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading] = useState(false);

  // In client/src/context/AuthContext.jsx
  const API_URL =
    (
      import.meta.env.VITE_API_URL || "https://careerorbit-ai-2.onrender.com"
    ).replace(/\/$/, "") + "/api";

  useEffect(() => {
    if (token) {
      // Set axios defaults
      axios.defaults.headers.common["x-auth-token"] = token;
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || "Login failed",
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || "Registration failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["x-auth-token"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};;
