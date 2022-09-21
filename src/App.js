import React from 'react';
import { Routes, Route, RouteLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Nav, ErrorBuddy, Patients, NotFounder } from './components';
import { Main, PatientsPage } from './pages';

function App() {
  return  (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/patients" element={<PatientsPage />} />
      </Routes>
    </>
  );
}

export default App;
