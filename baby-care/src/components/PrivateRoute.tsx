import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowed: Array<"regularUser" | "worker" | "admin">;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowed }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userType = useSelector((state: RootState) => state.auth.userType);

  if (!isAuthenticated || !userType || !allowed.includes(userType)) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;