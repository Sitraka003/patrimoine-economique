import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Possession from "./Possession";
import PatrimoineApp from "./Patrimoine";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importation du script Bootstrap
import Show from "./showAll";

const App = () => {
  return (
    <Router>
      <div className="bg-dark text-light min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid d-flex align-items-center bg-dark text-warning border border-dark-100 rounded">
            <h1>
              <Link
                className="navbar-brand text-primary font-weight-bold"
                to="/"
              >
                Patrimoine App
              </Link>
            </h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/possession">
                    Possession
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/patrimoine">
                    Patrimoine
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/show">
                    Show
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/possession" element={<Possession />} />
            <Route path="/patrimoine" element={<PatrimoineApp />} />
            <Route path="/show" element={<Show />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
