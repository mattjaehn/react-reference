import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
} from 'react-router-dom';

import { store } from './app/store';
import App from './App';

//NOTE worker.start() _is_ async, but the mws lib 
// [_should_ account for this...](https://mswjs.io/docs/recipes/deferred-mounting)

if (process.env.NODE_ENV !== 'production') {
    const { worker } = require('./mocks/browser');
    worker.start();
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
);

