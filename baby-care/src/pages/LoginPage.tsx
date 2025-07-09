import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Login from "../features/auth/Login";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userType = useSelector((state: RootState) => state.auth.userType);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (userType === "regularUser") navigate("/user-dashboard");
  //     else if (userType === "worker") navigate("/worker-dashboard");
  //     else if (userType === "admin") navigate("/admin-dashboard");
  //   }
  // }, [isAuthenticated, userType, navigate]);

  return (
    <div>
      <h1>התחברות</h1>
      <Login />
      <button onClick={() => navigate("/signup")}>הרשמה</button>
    </div>
  );
};

export default LoginPage;