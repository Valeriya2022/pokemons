import { configureStore } from '@reduxjs/toolkit';
import { pokemonsApi } from '@/redux/features/pokemonsSlice';
import pages from '@/redux/slices/pageSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfigPage = {
  key: 'pages',
  storage: storage
};

const persistedReducerPage = persistReducer(persistConfigPage, pages);

export const store = configureStore({
  reducer: {
    pages: persistedReducerPage,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([pokemonsApi.middleware])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
