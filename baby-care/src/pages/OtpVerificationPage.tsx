import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendVerificationCodeMutation, useValidateOTPMutation } from '../features/auth/authApi'; // Adjust the import path

const OtpVerification: React.FC<{ email: string }> = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [validateOTP] = useValidateOTPMutation();
  const navigate = useNavigate();

  const handleSendCode = async () => {
    await sendVerificationCode({ email });
  };

  const handleValidateOTP = async () => {
    const response = await validateOTP({ email, otp });
    if (response.data?.success) {
      navigate('/dashboard'); // Navigate to user dashboard
    } else {
      alert(response.error); // Handle error
    }
  };

  return (
    <div>
      <h1>אימות קוד</h1>
      <button onClick={handleSendCode}>שלח קוד אימות</button>
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
