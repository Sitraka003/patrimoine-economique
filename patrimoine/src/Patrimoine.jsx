// src/Patrimoine.jsx
import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import possessionsData from "../public/possession.json";
import Flux from "./Flux";
import BienMateriel from "./BienMateriel";
import Argent from "./Argent";

const Patrimoine = () => {
  const [date, setDate] = useState(new Date());
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    const parsedPossessions = possessionsData[1].data.possessions.map((item) => {
      let possession;
      if (item.jour !== undefined) {
        possession = new Flux(item.possesseur, item.libelle, item.valeur, item.dateDebut, item.dateFin, item.tauxAmortissement, item.jour);
      } else if (item.type !== undefined) {
        possession = new Argent(item.possesseur, item.libelle, item.valeur, item.dateDebut, item.dateFin, item.tauxAmortissement, item.type);
      } else {
        possession = new BienMateriel(item.possesseur, item.libelle, item.valeur, item.dateDebut, item.dateFin, item.tauxAmortissement);
      }
      return possession;
    });

    setPossessions(parsedPossessions);
  }, []);

  const totalValeurActuelle = possessions.reduce((total, possession) => total + possession.getValeur(date), 0);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Patrimoine</h1>
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="dd/MM/yyyy"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libelle</th>
                <th>Valeur Initiale</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Amortissement</th>
                <th>Valeur Actuelle</th>
              </tr>
            </thead>
            <tbody>
              {possessions.map((possession, index) => (
                <tr key={index}>
                  <td>{possession.libelle}</td>
                  <td>{possession.valeur}</td>
                  <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                  <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : "N/A"}</td>
                  <td>{possession.tauxAmortissement || "N/A"}</td>
                  <td>{possession.getValeur(date).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="5"><strong>Total Valeur Actuelle</strong></td>
                <td>{totalValeurActuelle.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Patrimoine;
