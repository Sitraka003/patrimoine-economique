import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios'; // Assure-toi que cet import est présent
import 'bootstrap/dist/css/bootstrap.min.css';

function PossessionsPage() {
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/myData')
      .then((response) => {
        const patrimoineData = response.data.find(item => item.model === 'Patrimoine');
        if (patrimoineData) {
          setPossessions(patrimoineData.data.possessions);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Possessions</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.libelle}</td>
              <td>{item.valeur}</td>
              <td>{item.dateDebut}</td>
              <td>{item.dateFin}</td>
              <td>{item.taux}</td>
              <td>{item.valeurActuelle}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PossessionsPage;
