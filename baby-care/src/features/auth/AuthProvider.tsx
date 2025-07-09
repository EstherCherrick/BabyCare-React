import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "./authSlice";
import { useRefreshTokenMutation } from "./authApi";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const res = await refreshToken({}).unwrap();
        if (res.token && res.user && res.userType) {
          dispatch(setCredentials({ user: res.user, token: res.token, userType: res.userType }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    handleAuth();
  }, [dispatch, refreshToken]);

  return <>{children}</>;
};

export default AuthProvider;