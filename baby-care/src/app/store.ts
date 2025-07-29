import { configureStore } from "@reduxjs/toolkit";

import { appointmentsApi } from '../api/appointmentsApi';
import authReducer from "./authSlice";
import { authApi } from "../api/authApi";
import { workersApi } from '../api/workerApi';
import { babiesApi } from '../api/babyApi'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [workersApi.reducerPath]: workersApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    [babiesApi.reducerPath]: babiesApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(workersApi.middleware)
      .concat(appointmentsApi.middleware)
      .concat(babiesApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
