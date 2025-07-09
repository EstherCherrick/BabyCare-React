import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./features/auth/SignUp";
import Home from "./pages/HomePage";
import OtpVerification from "./pages/OtpVerificationPage";
import WorkersDashboard from './features/workers/pages/WorkersDashboard';

const OtpVerificationWrapper: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  return <OtpVerification email={email || ""} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-verification/:email" element={<OtpVerificationWrapper />} />
        <Route path="/workers" element={<WorkersDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
