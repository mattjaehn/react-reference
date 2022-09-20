import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
    createBrowserRouter,
    RouterProvider,
    Router,
} from 'react-router-dom';

import { store } from './app/store';
import Patients from './features/patients/Patients';
import Root from './routes/root';


//NOTE worker.start() _is_ async, but the mws lib 
// [_should_ account for this...](https://mswjs.io/docs/recipes/deferred-mounting)

if (process.env.NODE_ENV !== 'production') {
    const { worker } = require('./mocks/browser');
    worker.start();
}


const eddie = () => (<div>hi, i'm Eddie, the shipboard computer!</div>);

const router = createBrowserRouter([
    {
        path: "/",
        element: Patients,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
);



