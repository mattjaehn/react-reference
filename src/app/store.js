//import { applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'remote-redux-devtools'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit';
import { patientsApi } from './api';
import currentDetailSlice from './slices/currentDetailSlice';


console.log(`patientsApi.reducerPath: ${patientsApi.reducerPath}`)
//console.log(`cds: ${JSON.stringify(currentDetailSlice)}`)

export const store =
  configureStore({
    reducer: {
      [patientsApi.reducerPath]: patientsApi.reducer,
      currentDetail: currentDetailSlice.reducer,

      //other reducer slices not directly associated with an api,...
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(patientsApi.middleware),
    
    /*
    devTools: {
      realtime: true,
      name: "matts-redux",
      "hostname": "localhost",
      "port": 3000,
     },
     */
  })
;



//setupListeners(store.dispatch)

