// src/context/Authorization/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import {AuthTokens} from "../../types/token/tokens"
interface AuthContextType {
  tokens: AuthTokens | null;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    // Optionally, initialize tokens from localStorage if you persist them
    const storedTokens = localStorage.getItem("tokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  });

  const login = (newTokens: AuthTokens) => {
    setTokens(newTokens);
    localStorage.setItem("tokens", JSON.stringify(newTokens)); // Persist tokens
  };

  const logout = () => {
    setTokens(null);
    localStorage.removeItem("tokens"); // Clear persisted tokens
  };

  return (
    <AuthContext.Provider value={{ tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};