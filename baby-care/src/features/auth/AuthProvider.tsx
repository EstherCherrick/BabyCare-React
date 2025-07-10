import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../../app/authSlice";
import { useRefreshTokenMutation } from "../../api/authApi";
import { RootState } from "../../app/store";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const handleAuth = async () => {
      if (isAuthenticated && token) {
        try {
          const payload = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));
          const expirationTime = decodedPayload.exp;
          const currentTime = Date.now() / 1000;
          console.log("Current Time:", currentTime);
          console.log("Token Expiration Time:", expirationTime);

          if (expirationTime - currentTime < 300) {
            const res = await refreshToken({}).unwrap();
            console.log("Refresh Token Response:", res);

            if (res.token && res.user && res.userType) {
              dispatch(setCredentials({ user: res.user, token: res.token, userType: res.userType }));
            } else {
              dispatch(logout());
            }
          }
        } catch (error) {
          dispatch(logout());
        }
      }
    };
    handleAuth();
  }, [dispatch, refreshToken, isAuthenticated, token]);

  return <>{children}</>;
};

export default AuthProvider;
