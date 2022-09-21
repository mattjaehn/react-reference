//import { applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'remote-redux-devtools'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit';
import { patientsApi } from './api';


export const store =
  configureStore({
    reducer: {
      [patientsApi.reducerPath]: patientsApi.reducer,
      //other reducer slices not directly associated with an api,...
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(patientsApi.middleware),
    devTools: {
      realtime: true,
      name: "matts-redux",
      "hostname": "localhost",
      "port": 3000,
     },
  })
;



setupListeners(store.dispatch)

