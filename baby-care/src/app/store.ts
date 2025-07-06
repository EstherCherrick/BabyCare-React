import { configureStore } from '@reduxjs/toolkit';
import { workersApi } from '../features/workers/workersApi';

export const store = configureStore({
  reducer: {
    [workersApi.reducerPath]: workersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
