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
  const [sendVerificationCode] = require('../../api/authApi').useSendVerificationCodeMutation();
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

        if (response.userType === "admin") {
          navigate("/admin-dashboard");
        } else if (response.userType === "worker") {
          navigate("/worker-dashboard");
        } else if (response.userType === "regularUser") {
          await sendVerificationCode({ email: form.email });
          setMessage("קוד אימות נשלח אליך ברגעים אלו"); 
          setIsOtpVisible(true); 
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
            placeholder="Id"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
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
