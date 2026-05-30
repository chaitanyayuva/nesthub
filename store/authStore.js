"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../lib/api";
import { getToken, setToken, removeToken, getUser, setUser } from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore user from localStorage
  useEffect(() => {
    const stored = getUser();
    if (stored && getToken()) {
      setUserState(stored);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password, role) => {
    const payload = { email, password };
    if (role) payload.role = role;

    console.log("[FRONTEND AUTH] Attempting login...", {
      baseURL: api.defaults.baseURL,
      url: "/api/auth/login",
      email,
      role,
      payload
    });

    try {
      const res = await api.post("/api/auth/login", payload);
      console.log("[FRONTEND AUTH] Login request completed successfully. Response data:", res.data);
      
      const { token, user: userData } = res.data;

      setToken(token);
      setUser(userData);
      setUserState(userData);

      return userData;
    } catch (error) {
      console.error("[FRONTEND AUTH] Login API call failed:", {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUserState(null);
    window.location.href = "/login";
  }, []);

  const fetchMe = useCallback(async () => {
    const res = await api.get("/api/auth/me");
    setUser(res.data);
    setUserState(res.data);
    return res.data;
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
    login,
    logout,
    fetchMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
