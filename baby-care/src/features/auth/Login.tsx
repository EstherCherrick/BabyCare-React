import React, { useState } from "react";
import { useCheckUserMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [login, { isLoading }] = useCheckUserMutation();
  const [form, setForm] = useState({ id: "", email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form).unwrap();
      if (response.userExists) {
        dispatch(setCredentials({ user: form.email, token: response.token, userType: response.userType }));
        if (response.userType === "regularUser") {
          navigate(`/otp-verification/${form.email}`);
        } else if (response.userType === "worker") {
          navigate("/worker-dashboard");
        } else if (response.userType === "admin") {
          navigate("/admin-dashboard");
        }
      } else {
        navigate("/signup");
      }
    } catch (error: any) {
      alert(error.data?.message || "שגיאה בהתחברות");
    }
  };

  return (
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
        התחברות
      </button>
    </form>
  );
};

export default Login;