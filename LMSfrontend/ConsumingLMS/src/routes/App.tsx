// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import StudentPage from "../pages/students/StudentPage";
import LoginPage from "../pages/Login/LoginPage";
import { AuthProvider } from "../context/Authorization/AuthContext";
import { ThemeProvider } from "../context/Authorization/ThemeContext";
import DashboardPage from "../pages/dashboard/DashBoardPage";
import Navbar from "../components/Navbar";
import AuthorPage from "../pages/authors/AuthorPage";
import BookPage from "../pages/books/BookPage";
import TransactionPage from "../pages/transaction/TransactionPage";
import IssuingPage from "../pages/issuing/IssuingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import { useAuth } from "../context/Authorization/AuthContext";
import { useEffect } from "react";

import faviconUrl from "../assets/logo.ico?url";
import { setFavicon } from "../services/service";
setFavicon({ href: faviconUrl });

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tokens } = useAuth();
  const showNavbar = location.pathname !== "/login";

  // Handle back/forward navigation using the History API
  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [tokens, location, navigate]);

  const handlePopState = () => {
    // If user is authenticated and tries to go back to /login
    if (tokens && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
      window.history.replaceState(null, "", "/dashboard");
    }
    // If user is not authenticated and tries to access a protected route
    else if (!tokens && location.pathname !== "/login") {
      navigate("/login", { replace: true });
      window.history.replaceState(null, "", "/login");
    }
  };
  // Replace history entry after initial render to prevent back to /login
  // useEffect(() => {
  //   if (tokens && location.pathname === "/login") {
  //     navigate("/dashboard", { replace: true });
  //     window.history.replaceState(null, "", "/dashboard");
  //   }
  // }, [tokens, location, navigate]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/author" element={<AuthorPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/transaction-view" element={<TransactionPage />} />
          <Route path="/transaction" element={<IssuingPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      {showNavbar && (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppLayout />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;