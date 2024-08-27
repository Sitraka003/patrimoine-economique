import './App.css';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyChart from './Patrimoine';
import TablePossession from './Possessions'; // Updated import
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
          <Route path="/possessions" element={<TablePossession />} />
          <Route path="/possessions/create" element={<CreatePossession />} />
          <Route path="/possessions/edit/:libelle" element={<UpdatePossession />} />
          <Route path="/patrimoine" element={<MyChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

