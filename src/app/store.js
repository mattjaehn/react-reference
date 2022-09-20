import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools'
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';


const devtoolsConfig = {
    realtime: true,
    name: "matts-redux",
    "hostname": "localhost",
    "port": 3939,
}


export const createStore = (options) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      //other reducer slices not directly associated with an api,...
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
    devTools: devtoolsConfig,
  })





export const store = createStore()
