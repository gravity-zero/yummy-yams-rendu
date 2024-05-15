import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import yamsEventReducer from './slices/yamsEventSlice';

const store = configureStore({
  reducer: {
    yamsEvent: yamsEventReducer,
    auth: authSlice,
    user: userSlice,
  },
});

export default store;