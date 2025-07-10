import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "../api/authApi";

import { workersApi } from '../api/workerApi';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [workersApi.reducerPath]: workersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware() .concat(authApi.middleware)
      .concat(workersApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


