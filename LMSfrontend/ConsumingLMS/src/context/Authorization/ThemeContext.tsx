// src/context/Authorization/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Theme {
  background: string;
  cardBackground: string;
  inputBackground: string;
  textColor: string;
  primaryColor: string;
  buttonTextColor: string;
  tableHeaderBg: string;
  tableRowHover: string;
  shadow: string;
  isLightMode?: boolean; // Add this
}

const lightTheme: Theme = {
  background: "#F2F2F2",
  cardBackground: "#E3E3E3",
  inputBackground: "#D9D9D9",
  textColor: "#333",
  primaryColor: "#255D81",
  buttonTextColor: "#fff",
  tableHeaderBg: "#255D81",
  tableRowHover: "#f5f5f5",
  shadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  isLightMode: true,
};

const darkTheme: Theme = {
  background: "#333",
  cardBackground: "#444",
  inputBackground: "#555",
  textColor: "#fff",
  primaryColor: "#1a3c5e",
  buttonTextColor: "#fff",
  tableHeaderBg: "#1a3c5e",
  tableRowHover: "#444",
  shadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  isLightMode: false,
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.isLightMode ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};