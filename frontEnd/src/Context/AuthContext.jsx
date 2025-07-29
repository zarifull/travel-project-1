import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance"; // ✅ Make sure you import this

// Create context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
  
    try {
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        
        // Check if required fields exist
        if (parsedUser && parsedUser._id && parsedUser.name && parsedUser.email) {
          setUser(parsedUser);
        } else {
          console.warn("⚠️ Incomplete user data in localStorage:", parsedUser);
          setUser(null);
        }
      } else {
        setUser(null);
      }
  
      if (storedToken) {
        setToken(storedToken);
      } else {
        setToken(null);
      }
  
    } catch (err) {
      console.error("❌ Invalid JSON in localStorage for user:", err);
      setUser(null);
      setToken(null);
    }
  }, []);
  

  // ✅ Fetch user if missing but token exists
  useEffect(() => {
    if (!user && token) {
      axiosInstance.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("Failed to fetch user profile:", err);
        });
    }
  }, [token, user]);

  const login = (userData, authToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
  };
  

  // Logout handler
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
