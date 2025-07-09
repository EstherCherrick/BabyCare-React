import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AuthProvider from "./features/auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SignUp from "./features/auth/SignUp";
import Home from "./pages/HomePage";
import OtpVerification from "./pages/OtpVerificationPage";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/Dashboards/UserDashboard";
import WorkerDashboard from "./pages/Dashboards/WorkerDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";

const App: React.FC = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp-verification/:email" element={<OtpVerificationWrapper />} />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute allowed={["regularUser"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/worker-dashboard"
            element={
              <PrivateRoute allowed={["worker"]}>
                <WorkerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowed={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  </Provider>
);

const OtpVerificationWrapper = () => {
  const { email } = useParams<{ email: string }>();
  return <OtpVerification email={email || ""} />;
};

export default App;