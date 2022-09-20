import React from 'react';
import { Routes, Route, RouteLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Patients from './features/patients/Patients';

function App() {
  return  (
    <Routes>
        <Route
            path="/"
            element={<Patients />}
        />
    </Routes>
  )

  }

export default App;
