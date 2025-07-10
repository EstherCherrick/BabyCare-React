import React from "react";
import { useParams } from "react-router-dom";
import OtpVerification from "../../features/auth/OtpVerification";

const OtpVerificationPage: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  return <OtpVerification email={email || ""} />;
};

export default OtpVerificationPage;
