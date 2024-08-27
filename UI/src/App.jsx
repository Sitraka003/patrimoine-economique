import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatrimoinePage from "./pages/PatrimoinePage";
import PossessionPage from "./pages/PossessionPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatrimoinePage />} />
        <Route path="/possession" element={<PossessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
