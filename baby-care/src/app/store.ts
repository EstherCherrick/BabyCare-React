import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "../api/authApi";
import { workersApi } from '../api/workerApi';
import { babiesApi } from '../api/babyApi'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [workersApi.reducerPath]: workersApi.reducer,
    [babiesApi.reducerPath]: babiesApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(workersApi.middleware)
      .concat(babiesApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
