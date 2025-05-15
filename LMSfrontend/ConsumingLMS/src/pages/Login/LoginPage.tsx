// src/pages/Login/LoginPage.tsx
import { useState, useEffect } from "react";
import LoginForm from "../../components/Login/LoginForm";
import Registerbook from "../../assets/BookRegister.svg";
import SignUpModel from "../../components/SignUp/SignUpModel";
import { useTheme } from "../../context/Authorization/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";

const LoginPage: React.FC = () => {
  const { theme } = useTheme();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const navigate = useNavigate();
  const { tokens } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (tokens) {
      navigate("/dashboard", { replace: true });
      window.history.replaceState(null, "", "/dashboard");
    }
  }, [tokens, navigate]);

  // If tokens exist, return null to prevent rendering (the useEffect will handle the redirect)
  if (tokens) {
    return null;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LoginForm />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          background: theme.primaryColor,
          color: theme.buttonTextColor,
          borderTopLeftRadius: "1.5rem",
          borderBottomLeftRadius: "1.5rem",
        }}
      >
        <img src={Registerbook} alt="Library Logo" style={{ marginBottom: "1rem" }} />
        <h1 style={{ fontSize: "2.25rem", fontWeight: "500" }}>HSMSS</h1>
        <h1 style={{ fontSize: "3rem", fontWeight: "500", marginBottom: "1rem" }}>LIBRARY</h1>
        <p style={{ fontSize: "1.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>New to our platform?</p>
        <p style={{ fontSize: "1.875rem", fontWeight: "500", marginBottom: "1rem" }}>Register Now</p>
        <button
          onClick={() => setIsSignUpOpen(true)}
          style={{
            background: theme.inputBackground,
            color: theme.textColor,
            padding: "0.75rem 6rem",
            borderRadius: "9999px",
            fontSize: "1.25rem",
            border: "none",
          }}
        >
          Register
        </button>
      </div>
      <SignUpModel isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </div>
  );
};

export default LoginPage;