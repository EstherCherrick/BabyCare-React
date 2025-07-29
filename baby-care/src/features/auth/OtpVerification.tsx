import React, { useState } from "react";
import '../../styles/login.css';
import { useValidateOTPMutation } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

interface Props {
  email: string;
}

const OtpVerification: React.FC<Props> = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validateOTP] = useValidateOTPMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setOtp(val);
    setErrorMessage("");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    setOtp(paste.slice(0, 6));
    setErrorMessage("");
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await validateOTP({ email, otp });
      if (response.data?.success) {
        navigate("/user-dashboard");
      } else {
        setErrorMessage("הקוד שהוזן אינו נכון. נסה שוב.");
      }
    } catch (err) {
      setErrorMessage("שגיאה באימות הקוד. נסה שוב.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 0 }}>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        onPaste={handlePaste}
        maxLength={6}
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        style={{
          width: "100%",
          padding: "16px 20px",
          marginBottom: "18px",
          borderRadius: "12px",
          fontSize: "2rem",
          background: "rgba(248,250,252,0.8)",
          border: "2px solid #e0f2fe",
          boxShadow: "0 1px 6px rgba(33,150,243,0.10)",
          outline: "none",
          textAlign: "center",
          letterSpacing: "0.3em",
          transition: "border-color 0.2s",
        }}
      />
      <button
        type="submit"
        disabled={otp.length !== 6}
        style={{
          width: "100%",
          padding: "16px 24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
          color: "white",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(14, 165, 233, 0.3)",
          border: "none",
          marginTop: "8px"
        }}
      >
        אמת קוד
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default OtpVerification;

