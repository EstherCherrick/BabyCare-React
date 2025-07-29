import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AuthProvider from "./features/auth/AuthProvider";
import LoginPage from "./pages/AuthPages/LoginPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import Home from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/Dashboards/UserDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import WorkerDashboard from "./pages/Dashboards/WorkerDashboard";
import AppointmentsPage from "./pages/Appointments/AppointmentPage";

const App: React.FC = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route
            path="/appointments"
            element={
              <PrivateRoute allowed={["regularUser"]}>
                <AppointmentsPage />
              </PrivateRoute>
            }
          />
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

export default App;
