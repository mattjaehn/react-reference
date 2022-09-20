import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render } from 'react-dom';

import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Patients from './features/patients/Patients';


async function launchFakeServer() {
    if (process.env.NODE_ENV !== 'production') {
        const { worker } = require('./mocks/browser');
        await worker.start();
    }
}





//const root = createRoot(document.getElementById('root'));
render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="patients"
            element={<Patients />}
          />
        </Routes>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


launchFakeServer();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
