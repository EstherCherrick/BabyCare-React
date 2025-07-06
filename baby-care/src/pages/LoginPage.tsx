import React from "react";
import { useNavigate } from 'react-router-dom';
import Login from "../features/auth/Login";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>התחברות</h1>
            <Login  />
            <button onClick={() => navigate('/signup')}>הרשמה</button>
        </div>
    );
};

export default LoginPage;
