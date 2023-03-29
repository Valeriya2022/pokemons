import { configureStore } from '@reduxjs/toolkit';
import { pokemonsApi } from '@/redux/features/pokemonsSlice';

export const store = configureStore({
  reducer: {
    [pokemonsApi.reducerPath]: pokemonsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([pokemonsApi.middleware])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
