import './App.css';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Patrimoine from './Patrimoine';
import TablePossession from './Possessions';
import CreatePossession from './CreatePossession';
import UpdatePossession from './UpdatePossessions';

function NavBar() {
  return (
    <Nav variant="tabs" defaultActiveKey="/home" className="d-flex justify-content-around" style={{ width: '90vw' }}>
      <Nav.Item>
        <Nav.Link href="/possessions">Possessions</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/patrimoine">Patrimoine</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to = "/possessions" />} />
          <Route path="/possessions" element={<TablePossession />} />
          <Route path="/possession/create" element={<CreatePossession />} />
          <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
          <Route path="/patrimoine" element={<Patrimoine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

