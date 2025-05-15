import React from 'react';
import Admin from '../../assets/DashboardHead.svg';
import { useTheme } from "../../context/Authorization/ThemeContext";

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  const { theme } = useTheme();

  return (
    <div style={{ position: "fixed", top: 0, left: "222px", right: 0, height: "65px", background: theme.cardBackground, boxShadow: theme.shadow, display: "flex", alignItems: "center", padding: "0 1.25rem", zIndex: 10 }}>
      <img src={Admin} alt="User Icon" style={{ width: "1.25rem", height: "1.25rem", marginRight: "0.5rem" }} />
      <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: theme.textColor }}>{username}</h2>
    </div>
  );
};

export default DashboardHeader;