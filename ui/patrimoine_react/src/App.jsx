import React from 'react';
// import { Button } from 'react-bootstrap';
import data from '../../../data/data.json'
import { Table } from 'react-bootstrap';

function App() {
  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Valeur</th>
            <th>Date de Debut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.possessions.map(element => (
              <p>{element.libelle}</p>
            ))}</td>
            <td>{data.possessions.map(element => (
              <p>{Math.abs(element.valeur) || Math.abs(element.valeurConstante)}</p>
            ))}</td>
            <td>{data.possessions.map(element => (
              <p>{element.dateDebut}</p>
            ))}</td>
          </tr>
        </tbody>
      </Table>
      {/* <Button variant="primary">Primary Button</Button> */}

    </div>
  );
}

export default App;
