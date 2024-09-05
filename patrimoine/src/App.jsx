import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Patrimoine from './Patrimoine';
import PossessionList from './PossessionList';
import { Container, Nav, Navbar } from 'react-bootstrap';

const App = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Gestion du Patrimoine</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/patrimoine">
                Patrimoine
              </Nav.Link>
              <Nav.Link as={Link} to="/possessions">
                Possessions
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/patrimoine" element={<Patrimoine />} />
          <Route path="/possessions" element={<PossessionList />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
