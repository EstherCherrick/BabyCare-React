import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendVerificationCodeMutation, useValidateOTPMutation } from "../../api/authApi";

const OtpVerification: React.FC<{ email: string }> = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); 
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [validateOTP] = useValidateOTPMutation();
  const navigate = useNavigate();

  const handleSendCode = async () => {
    await sendVerificationCode({ email });
    setIsCodeSent(true); 
  };

  const handleValidateOTP = async () => {
    const response = await validateOTP({ email, otp });
    if (response.data?.success) {
      navigate("/user-dashboard");
    } else {
      alert(response.error);
    }
  };

  return (
    <div>
      <h1>אימות קוד</h1>
      <button onClick={handleSendCode} disabled={isCodeSent}>שלח קוד אימות</button>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="הכנס קוד אימות"
      />
      <button onClick={handleValidateOTP}>אמת קוד</button>
    </div>
  );
};

export default OtpVerification;
