// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoutIcon from "../assets/Logout.svg";
import dashboardIcon from "../assets/Dashboard.svg";
import authorsIcon from "../assets/Author.svg";
import bookIcon from "../assets/Books.svg";
import studentsIcon from "../assets/Students.svg";
import transactionIcon from "../assets/Transaction.svg";
import issuingIcon from "../assets/Issuing.svg";
import { useTheme } from "../context/Authorization/ThemeContext";
import { useAuth } from "../context/Authorization/AuthContext";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear tokens
    navigate("/login", { replace: true }); // Replace history entry
    window.history.replaceState(null, "", "/login"); // Explicitly replace history state
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "222px",
        height: "100vh",
        background: theme.primaryColor,
        color: theme.buttonTextColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "51px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
        zIndex: 1030,
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "700", color: theme.buttonTextColor }}>HSMSS</h1>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "700", color: theme.buttonTextColor }}>LIBRARY</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", marginTop: "1.25rem" }}>
        {[
          { path: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
          { path: "/author", icon: authorsIcon, label: "Author" },
          { path: "/book", icon: bookIcon, label: "Books" },
          { path: "/student", icon: studentsIcon, label: "Students" },
          { path: "/transaction-view", icon: transactionIcon, label: "Transactions" },
          { path: "/transaction", icon: issuingIcon, label: "Issuing" },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{ display: "flex", alignItems: "center", width: "100%", padding: "0.75rem", color: theme.buttonTextColor }}
            className="group hover:bg-white hover:text-[var(--primaryColor)] transition-all duration-300"
          >
            <img
              src={link.icon}
              alt={`${link.label} Icon`}
              style={{ width: "1.25rem", height: "1.25rem", marginRight: "0.5rem" }}
              className="transition-all duration-300 group-hover:invert-[500%] group-hover:sepia-[1000%] group-hover:saturate-[1000%] group-hover:hue-rotate-[175deg]"
            />
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "auto", width: "100%" }}>
        <div style={{ padding: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              width: "150px",
              height: "40px",
              background: theme.isLightMode ? "#e0e0e0" : "#333",
              borderRadius: "20px",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "10px",
                display: "flex",
                alignItems: "center",
                color: theme.isLightMode ? theme.primaryColor : "#888",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <span style={{ marginRight: "5px" }}>LIGHT</span>
              <span>☀️</span>
            </div>
            <div
              style={{
                position: "absolute",
                right: "10px",
                display: "flex",
                alignItems: "center",
                color: !theme.isLightMode ? theme.primaryColor : "#888",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <span>🌙</span>
              <span style={{ marginLeft: "5px" }}>DARK</span>
            </div>
            <div
              style={{
                width: "70px",
                height: "30px",
                background: theme.isLightMode ? "#fff" : "#555",
                borderRadius: "15px",
                position: "absolute",
                left: theme.isLightMode ? "5px" : "75px",
                transition: "left 0.3s ease",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        <div
          onClick={handleLogout}
          style={{ display: "flex", alignItems: "center", width: "100%", padding: "0.75rem", color: theme.buttonTextColor }}
          className="group hover:bg-white hover:text-[var(--primaryColor)] transition-all duration-300 cursor-pointer"
        >
          <img
            src={logoutIcon}
            alt="Logout Icon"
            style={{ width: "1.25rem", height: "1.25rem", marginRight: "0.5rem" }}
            className="transition-all duration-300 group-hover:invert-[200%] group-hover:sepia-[1000%] group-hover:saturate-[100%] group-hover:hue-rotate-[900deg]"
          />
          Logout
        </div>
      </div>
    </nav>
  );
};

export default Navbar;