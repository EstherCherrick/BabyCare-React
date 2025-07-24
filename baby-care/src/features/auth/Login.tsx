
// import React, { useState } from "react";
// import { useCheckUserMutation, useSendVerificationCodeMutation } from "../../api/authApi";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../app/authSlice";
// import { useNavigate, Link } from "react-router-dom";
// // import { Logo } from "../../assets/logo"; // Import the Logo component
// import OtpVerification from "./OtpVerification"; // Import the OtpVerification component
// import '../../styles/login.css'; // Import the CSS file
// import '../../styles/global.css'; // Import the CSS file

// const Login: React.FC = () => {
//   const [login, { isLoading }] = useCheckUserMutation();
//   const [form, setForm] = useState({ id: "", email: "" });
//   const [isOtpVisible, setIsOtpVisible] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isCodeSent, setIsCodeSent] = useState(false); 
//     const [sendVerificationCode] = useSendVerificationCodeMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//    const handleSendCode = async () => {
//     await sendVerificationCode({ email:form.email });
//     setIsCodeSent(true); 
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await login(form).unwrap();
//       if (response.userExists) {
//         dispatch(setCredentials({ user: form.email, token: response.token, userType: response.userType }));
//         handleSendCode();
//         setMessage("קוד אימות נשלח אליך ברגעים אלו"); 
//        setIsOtpVisible(true); 
//       } else {
//         navigate("/signup");
//       }
//     } catch (error: any) {
//       setMessage(error.data?.message || "Error in login");
//     }
//   };

//   return (
//     <div className="login-card">
//               <div className="w-full max-w-md">
//           {/* <div className="flex justify-center mb-8">
//             <Logo className="h-12" />
//           </div> */}
          
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="enter id"
//           value={form.id}
//           onChange={(e) => setForm({ ...form, id: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="enter email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? <div className="loader"></div> : "Login"}
//         </button>
//       </form>
//       {message && <div className="success-message">{message}</div>} 
//       {isOtpVisible && <OtpVerification email={form.email} />}
//       <p>Don't have an account yet? <Link to="/signup">Sign up</Link></p> 
//     </div>
//                </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useCheckUserMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/authSlice";
import { useNavigate, Link } from "react-router-dom";
import OtpVerification from "./OtpVerification"; 
import '../../styles/login.css'; 
import '../../styles/global.css'; 

const Login: React.FC = () => {
  const [login, { isLoading }] = useCheckUserMutation();
  const [form, setForm] = useState({ id: "", email: "" });
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form).unwrap();
      if (response.userExists) {
        dispatch(setCredentials({ user: form.email, token: response.token, userType: response.userType }));

        // Check user type and navigate accordingly
        if (response.userType === "admin") {
          navigate("/admin-dashboard");
        } else if (response.userType === "worker") {
          navigate("/worker-dashboard");
        } else if (response.userType === "regularUser") {
          setMessage("קוד אימות נשלח אליך ברגעים אלו"); 
          setIsOtpVisible(true); // Show OTP component for regular users
        }
      } else {
        navigate("/signup");
      }
    } catch (error: any) {
      setMessage(error.data?.message || "Error in login");
    }
  };
  
  return (
    <div className="login-card">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter id"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
          <input
            type="email"
            placeholder="enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? <div className="loader"></div> : "Login"}
          </button>
        </form>
        {message && <div className="success-message">{message}</div>} 
        {isOtpVisible && <OtpVerification email={form.email} />} 
        <p>Don't have an account yet? <Link to="/signup">Sign up</Link></p> 
      </div>
    </div>
  );
};

export default Login;
