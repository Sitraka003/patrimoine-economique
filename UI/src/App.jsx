import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import PatrimoinePage from "./pages/PatrimoinePage";
import PossessionPage from "./pages/PossessionPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">Menu</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">
              Patrimoine
            </Nav.Link>
            <Nav.Link as={Link} to="/possession">
              Possession
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<PatrimoinePage />} />
        <Route path="/possession" element={<PossessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
