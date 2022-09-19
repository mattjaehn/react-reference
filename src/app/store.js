import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './api/api';

export const createStore = (options) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      //other reducer slices not directly associated with an api,...
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  })

export const store = createStore()
