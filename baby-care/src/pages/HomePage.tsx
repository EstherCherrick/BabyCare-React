import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApi";
import { RootState } from "../app/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userType = useSelector((state: RootState) => state.auth.userType);

  const navigateToPersonalArea = () => {
    if (isAuthenticated) {
      if (userType === "regularUser") navigate("/user-dashboard");
      else if (userType === "worker") navigate("/worker-dashboard");
      else if (userType === "admin") navigate("/admin-dashboard");
    } else {
      navigate("/login");
    }
  };
   const navigateToWorkersDashboard = () => {
    navigate('/workers');
  };

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(logoutAction());
      alert("Logout successful.");
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };


  return (
    <div>
      <h1>ברוכים הבאים לטיפת חלב</h1>
      <p>מרפאה להתפתחות התינוק שלכם</p>
      <button onClick={navigateToPersonalArea}>אזור אישי</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;