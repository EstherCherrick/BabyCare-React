import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = "regularUser" | "worker" | "admin" | null;

interface AuthState {
  user: string | null;
  token: string | null;
  userType: UserType;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  userType: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string; token: string; userType: UserType }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;