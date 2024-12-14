import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import analyticsReducer from './analyticsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
