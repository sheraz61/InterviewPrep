import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dashboardReducer from './slices/dashboardSlice';
import profileSlice from './slices/profileSlice';
import interviewSlice from './slices/interviewSlice'
// Persist config
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated']
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
     dashboard: dashboardReducer,
      profile: profileSlice,
      interview:interviewSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);