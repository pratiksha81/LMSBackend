// src/pages/issuing/IssuingPage.tsx
import { useState, Component, ReactNode } from "react";
import IssuingHeader from "../../assets/IssueBookHead.svg";
import IssuingForm from "../../components/issuing/IssuingForm";
import Navbar from "../../components/Navbar";
import { IssuingTransaction } from "../../types/issuing/Issuing";
import { createTransaction } from "../../services/issuing/IssuingService";
import { toast } from "react-toastify";
import { useTheme } from "../../context/Authorization/ThemeContext";

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error in IssuingPage:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Something went wrong in IssuingPage.</h1>;
    }
    return this.props.children;
  }
}

const IssuingPage: React.FC = () => {
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  // const { logout } = useAuth();
  // const navigate = useNavigate();

  console.log("IssuingPage is rendering");
  console.log("Theme:", theme); // Add this to debug theme

  const handleIssueBook = async (transaction: IssuingTransaction) => {
    try {
      await createTransaction(transaction);
      setError(null);
      toast.success("Book issued successfully!");
      console.log("Transaction issued successfully:", transaction);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.response?.data || err.message || "Failed to issue book.";
      setError(JSON.stringify(errorMessage, null, 2));
      toast.error("Failed to issue book");
      console.error("Error issuing transaction:", {
        message: err.message,
        status: err.response?.status,
        responseData: err.response?.data,
        requestPayload: transaction,
      });
    }
  };

 
  return (
    <ErrorBoundary>
      <div style={{ display: "flex" }}>
        <Navbar />
        <div style={{ marginLeft: "222px", width: "100%" }}>
          <div
            style={{
              height: "65px",
              background: theme.cardBackground,
              boxShadow: theme.shadow,
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <img src={IssuingHeader} alt="Issue Book Icon" style={{ width: "35px", height: "35px", marginRight: "10px" }} />
            <h2 style={{ fontSize: "18px", margin: 0, color: theme.textColor }}>Issue Book</h2>
          </div>
          <div
            style={{
              background: theme.background,
              padding: "20px",
              height: "calc(100vh - 65px)",
              overflowY: "auto",
            }}
          >
            {error && (
              <div
                style={{
                  background: "#fdd",
                  color: "#d00",
                  padding: "10px",
                  marginBottom: "20px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {error}
              </div>
            )}
            <IssuingForm onSubmit={handleIssueBook} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default IssuingPage;