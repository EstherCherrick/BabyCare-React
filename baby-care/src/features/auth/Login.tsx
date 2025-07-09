import React, { useState } from "react";
import { useCheckUserMutation } from "./authApi";
import { useNavigate } from 'react-router-dom';
import { setTokenToCookie, setUserToCookie } from '../../utils/cookies';

const Login: React.FC = () => {
  const [login, { isLoading }] = useCheckUserMutation();
  const [form, setForm] = useState({ id: "", email: "" });
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await login(form).unwrap();
        if (response.userExists) {
            setTokenToCookie(response.token); 
            setUserToCookie(form.email); 
     
            navigate(`/otp-verification/${form.email}`); 
        } else {
            alert(response.message || "User does not exist."); 
        }
    } catch (error:any) {
        alert(error.data?.message || "שגיאה בהתחברות"); // Improved error handling
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
