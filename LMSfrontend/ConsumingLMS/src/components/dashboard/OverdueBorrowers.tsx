import React from 'react';
import { OverdueBorrower } from '../../types/dashboard/dashboard';
import Admin from '../../assets/StudentOverdue.svg';
import { useTheme } from "../../context/Authorization/ThemeContext";

interface OverdueBorrowersProps {
  borrowers: OverdueBorrower[] | null;
}

const OverdueBorrowers: React.FC<OverdueBorrowersProps> = ({ borrowers }) => {
  const { theme } = useTheme();

  if (!borrowers || borrowers.length === 0) {
    return (
      <div style={{ background: theme.cardBackground, borderRadius: "0.5rem", padding: "1.25rem", boxShadow: theme.shadow }}>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "600", color: theme.textColor, marginBottom: "1rem" }}>Overdue Borrowers</h5>
        <p style={{ color: "#6b7280" }}>No overdue borrowers found.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", borderRadius: "0.5rem", padding: "1rem", boxShadow: theme.shadow }}>
      <h5 style={{ fontSize: "1rem", fontWeight: "600", color: theme.textColor, marginBottom: "0.75rem" }}>Overdue Borrowers</h5>
      <div style={{ maxHeight: "150px", overflowY: "auto", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        {borrowers.map((borrower) => (
          <div
            key={borrower.borrowedId}
            style={{ width: "500px", height: "50px", border: "1px solid #d1d5db", borderRadius: "0.5rem", display: "flex", alignItems: "center", padding: "0.75rem", background: "#fff", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)" }}
          >
            <div style={{ width: "24px", height: "24px", borderRight: "2px solid #000", paddingRight: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={Admin} alt="Icon" style={{ width: "1rem", height: "1rem" }} />
            </div>
            <div style={{ marginLeft: "0.75rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: "700", color: theme.textColor }}>{borrower.borrowedId}</span>
              <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{borrower.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverdueBorrowers;