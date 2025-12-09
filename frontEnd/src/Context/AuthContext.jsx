import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    try {
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);

        if (
          parsedUser &&
          parsedUser._id &&
          parsedUser.name &&
          parsedUser.email &&
          parsedUser.role 
        ) {
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
          logout(); 
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

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    console.log("👤 Current user in context:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
