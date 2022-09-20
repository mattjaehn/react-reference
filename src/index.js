import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Router,
} from 'react-router-dom';

import { store } from './app/store';
import Patients from './features/patients/Patients';

async function launchFakeServer() {
    if (process.env.NODE_ENV !== 'production') {
        const { worker } = require('./mocks/browser');
        await worker.start();
    }
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <div>hi, i'm Eddie, the shipboard computer!</div>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
)




launchFakeServer();
