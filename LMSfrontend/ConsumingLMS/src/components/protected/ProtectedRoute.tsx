// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { tokens } = useAuth();

  if (!tokens) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

// const ProtectedRoute: React.FC = () => {
//   const tokens = useSelector((state: RootState) => state.auth.tokens);

//   if (!tokens) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;