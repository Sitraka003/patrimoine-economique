import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { readFile } from '../../data/index.js';

const PatrimoineTable = () => {
  const [patrimoine, setPatrimoine] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readFile('../../data/data.json');
      if (result.status === "OK") {
        setPatrimoine(result.data);
      } else {
        console.error('Erreur lors du chargement des données:', result.error);
      }
    };
    fetchData();
  }, []);

  const calculerValeurPatrimoine = () => {
    const total = patrimoine.reduce((acc, item) => acc + item.valeurActuelle, 0);
    return total;
  };

  return (
    <Container>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Valeur Initiale</th>
                <th>Date de Début</th>
                <th>Date de Fin</th>
                <th>Amortissement</th>
                <th>Valeur Actuelle</th>
              </tr>
            </thead>
            <tbody>
              {patrimoine.map((item, index) => (
                <tr key={index}>
                  <td>{item.libelle}</td>
                  <td>{item.valeurInitiale}</td>
                  <td>{item.dateDebut}</td>
                  <td>{item.dateFin}</td>
                  <td>{item.amortissement}</td>
                  <td>{item.valeurActuelle}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={() => alert(`Valeur Totale du Patrimoine : ${calculerValeurPatrimoine()} €`)}>Valider</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PatrimoineTable;
