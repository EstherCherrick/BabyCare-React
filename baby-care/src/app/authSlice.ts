import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = "regularUser" | "worker" | "admin" | null;

interface AuthState {
  user: string | null;
  token: string | null;
  userType: UserType;
  isAuthenticated: boolean;
  babyId?: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  userType: null,
  isAuthenticated: false,
  babyId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string; token: string; userType: UserType; babyId?: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
      if (action.payload.babyId) {
        state.babyId = action.payload.babyId;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
      state.babyId = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;