import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import PossessionList from './Components/PossessionList';
import CreatePossession from './Components/CreatePossession';
import UpdatePossession from './Components/updatePossession';
import PatrimoinePage from './Components/PatrimoinePage';
import './App.css';

function HeroSection() {
  const location = useLocation();
  return location.pathname === '/' ? (
    <div className="hero-text d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-3 font-weight-bold">Bienvenue dans l'application de gestion du patrimoine</h1>
        <p className="lead">Calculateur de patrimoine pour une gestion efficace de vos biens</p>
      </div>
    </div>
  ) : null;
}

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Header />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/possession" element={<><HeroSection /><PossessionList /></>} />
          <Route path="/possession/create" element={<><HeroSection /><CreatePossession /></>} />
          <Route path="/possession/:libelle/update" element={<><HeroSection /><UpdatePossession /></>} />
          <Route path="/patrimoine" element={<PatrimoinePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
