import React from 'react';
import { useTheme } from "../../context/Authorization/ThemeContext";

interface StatsCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, count, label }) => {
  const { theme } = useTheme();

  return (
    <div style={{ background: "#fff", borderRadius: "0.375rem", padding: "1.25rem", display: "flex", alignItems: "center", marginBottom: "1.25rem", boxShadow: theme.shadow }}>
      <div style={{ marginRight: "1rem" }}>{icon}</div>
      <div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: theme.textColor }}>{count}</h3>
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;