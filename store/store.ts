import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../modules/auth/api/repository';
import { authSlice } from '../modules/auth/service/slice';
import type { TypedUseSelectorHook } from 'react-redux';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'conduit',
  storage,
  whitelist: [authSlice.name],
};

const persistentReducer = persistReducer(
  persistConfig,
  combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSlice.reducer,
  }),
);

export const store = configureStore({
  reducer: persistentReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type GetRootState = typeof store.getState;
