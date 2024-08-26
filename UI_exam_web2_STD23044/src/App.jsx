import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import PossessionList from './Components/PossessionList';
import CreatePossession from './Components/CreatePossession';
import UpdatePossession from './Components/updatePossession';
import './App.css';

function HeroSection() {
  const location = useLocation();
  return location.pathname === '/' ? (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-3 font-weight-bold">Welcome to the Patrimoine App Calculator</h1>
      </div>
    </div>
  ) : null;
}

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/possession" element={<><HeroSection /><PossessionList /></>} />
          <Route path="/possession/create" element={<><HeroSection /><CreatePossession /></>} />
          <Route path="/possession/:libelle/update" element={<><HeroSection /><UpdatePossession /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
