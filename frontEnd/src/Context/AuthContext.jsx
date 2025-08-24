import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance"; // ✅ Your custom axios instance

// Create context
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    try {
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);

        // ✅ Make sure required fields are present
        if (
          parsedUser &&
          parsedUser._id &&
          parsedUser.name &&
          parsedUser.email &&
          parsedUser.role // ✅ Required for admin check
        ) {
          setUser(parsedUser);
        } else {
          console.warn("⚠️ Incomplete user data in localStorage:", parsedUser);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      // ✅ Load token if it exists
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

  useEffect(() => {
    if (!user && token) {
      axiosInstance
        .get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("❌ Failed to fetch user profile:", err);
          logout(); // ✅ THIS logs out automatically if token is invalid
        });
    }
  }, [token, user]);
  

  // ✅ Login: store user & token
  const login = (userData, authToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
  };

  // ✅ Logout: clear storage & state
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // ✅ Debug log (optional, remove in production)
  useEffect(() => {
    console.log("👤 Current user in context:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}
