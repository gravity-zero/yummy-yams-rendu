import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajoutez d'autres reducers si nécessaire
  },
});

export default store;