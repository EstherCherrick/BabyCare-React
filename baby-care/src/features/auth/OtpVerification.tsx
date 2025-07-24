
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSendVerificationCodeMutation, useValidateOTPMutation } from "../../api/authApi";
// import '../../styles/otpVerification.css'; 
// import '../../styles/global.css'; 

// const OtpVerification: React.FC<{ email: string }> = ({ email }) => {
//   const [otp, setOtp] = useState(Array(6).fill("")); 
//   const [errorMessage, setErrorMessage] = useState(""); 
//   const [sendVerificationCode] = useSendVerificationCodeMutation();
//   const [validateOTP] = useValidateOTPMutation();
//   const navigate = useNavigate();

//   const handleSendCode = async () => {
//     await sendVerificationCode({ email }); // Send the verification code
//   };

//   useEffect(() => {
//     handleSendCode(); // Send code when component mounts
//   }, [email]);

//   const handleValidateOTP = async () => {
//     const response = await validateOTP({ email, otp: otp.join("") }); 
//     if (response.data?.success) {
//       navigate("/user-dashboard");
//     } else {
//       setErrorMessage("The code you entered is incorrect. Please try again.");
//     }
//   };

//   const handleChange = (value: string, index: number) => {
//     const newOtp = [...otp];

//     if (value.length > 1) {
//       const pastedValues = value.split('');
//       for (let i = 0; i < pastedValues.length; i++) {
//         if (i < otp.length) {
//           newOtp[i] = pastedValues[i];
//         }
//       }
//       setOtp(newOtp);
//       const nextInput = document.querySelector(`input[name="otp-${pastedValues.length}"]`) as HTMLInputElement;
//       if (nextInput) {
//         nextInput.focus();
//       }
//       return;
//     }

//     if (value === "") {
//       if (index > 0) {
//         const previousInput = document.querySelector(`input[name="otp-${index - 1}"]`) as HTMLInputElement;
//         if (previousInput) {
//           previousInput.focus();
//         }
//       }
//     } else {
//       newOtp[index] = value;
//       if (value && index < otp.length - 1) {
//         const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement;
//         if (nextInput) {
//           nextInput.focus();
//         }
//       }
//     }

//     setOtp(newOtp);
//     setErrorMessage(""); 
//   };

//   return (
//     <div className="otp-section">
//       <h2 style={{ fontSize: '14px', fontWeight: 'normal' }}>אימות קוד</h2>
//       <div className="otp-input-row">
//         {otp.map((value, index) => (
//           <input
//             key={index}
//             type="text"
//             name={`otp-${index}`}
//             value={value}
//             onChange={(e) => handleChange(e.target.value, index)}
//             className="otp-input"
//             maxLength={1}
//             onFocus={(e) => e.target.select()} 
//           />
//         ))}
//       </div>
//       <button onClick={handleValidateOTP} disabled={otp.some(o => o === "")}>אמת קוד</button>
//       {errorMessage && <div className="error-message">{errorMessage}</div>} 
//     </div>
//   );
// };

// // export default OtpVerification;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSendVerificationCodeMutation, useValidateOTPMutation } from "../../api/authApi";
// import VerificationInput from "react-verification-input";
// import '../../styles/otpVerification.css'; 
// import '../../styles/global.css'; 

// const OtpVerification: React.FC<{ email: string }> = ({ email }) => {
//   const [otp, setOtp] = useState(""); 
//   const [errorMessage, setErrorMessage] = useState(""); 
//   const [sendVerificationCode] = useSendVerificationCodeMutation();
//   const [validateOTP] = useValidateOTPMutation();
//   const navigate = useNavigate();

//   const handleSendCode = async () => {
//     await sendVerificationCode({ email }); // Send the verification code
//   };

//   useEffect(() => {
//     handleSendCode(); // Send code when component mounts
//   }, [email]);

//   const handleValidateOTP = async () => {
//     const response = await validateOTP({ email, otp }); 
//     if (response.data?.success) {
//       navigate("/user-dashboard");
//     } else {
//       setErrorMessage("The code you entered is incorrect. Please try again.");
//     }
//   };

//   return (
//     <div className="otp-section">
//       <h2>אימות קוד</h2>
//       <VerificationInput validChars="0-9" inputProps={{ inputMode: "numeric" }} />
//       <button onClick={handleValidateOTP} disabled={otp.length < 6}>אמת קוד</button>
//       {errorMessage && <div className="error-message">{errorMessage}</div>} 
//     </div>
//   );
// };

// export default OtpVerification;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendVerificationCodeMutation, useValidateOTPMutation } from "../../api/authApi";
import VerificationInput from "react-verification-input";
import '../../styles/otpVerification.css'; 
import '../../styles/global.css'; 

const OtpVerification: React.FC<{ email: string }> = ({ email }) => {
  const [otp, setOtp] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [validateOTP] = useValidateOTPMutation();
  const navigate = useNavigate();

  const handleSendCode = async () => {
    await sendVerificationCode({ email }); // Send the verification code
  };

  useEffect(() => {
    handleSendCode(); // Send code when component mounts
  }, [email]);

  const handleValidateOTP = async () => {
    const response = await validateOTP({ email, otp }); 
    if (response.data?.success) {
      navigate("/user-dashboard");
    } else {
      setErrorMessage("The code you entered is incorrect. Please try again.");
    }
  };

  return (
    <div className="otp-card">
      <h2>אימות קוד</h2>
      <VerificationInput 
        validChars="0-9" 
        inputProps={{ 
          inputMode: "numeric", 
          // className: "verification-input", 
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setOtp(event.target.value) // Adjusted here
        }} 
      />
      <button 
        className="otp-button" 
        onClick={handleValidateOTP} 
        disabled={otp.length < 6}
      >
        אמת קוד
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>} 
    </div>
  );
};

export default OtpVerification;
