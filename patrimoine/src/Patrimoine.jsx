import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import possessionsData from "../public/possession.json";
import Flux from "./Flux";
import BienMateriel from "./BienMateriel";
import Argent from "./Argent";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Patrimoine = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [validatedDate, setValidatedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [possessions, setPossessions] = useState([]);
  const [dates, setDates] = useState([]);
  const [valuesOverTime, setValuesOverTime] = useState([]);
  const [totalValeurActuelle, setTotalValeurActuelle] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPossession, setNewPossession] = useState({
    libelle: '',
    valeur: 0,
    dateDebut: new Date(),
    tauxAmortissement: 0,
  });

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

  const handleValidateDate = () => {
    setValidatedDate(selectedDate);
    const calculatedTotal = possessions.reduce((total, possession) => total + possession.getValeur(selectedDate), 0);
    setTotalValeurActuelle(calculatedTotal);
  };

  const handleUpdateChart = () => {
    if (startDate && endDate) {
      const dateRange = [];
      const valueRange = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const valueForDate = possessions.reduce((total, possession) => total + possession.getValeur(currentDate), 0);
        dateRange.push(new Date(currentDate));
        valueRange.push(valueForDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDates(dateRange);
      setValuesOverTime(valueRange);
    }
  };

  const handleCreatePossession = () => {
    const newPoss = new BienMateriel(
      { nom: 'Default' },
      newPossession.libelle,
      parseFloat(newPossession.valeur),
      newPossession.dateDebut,
      null,
      parseFloat(newPossession.tauxAmortissement)
    );
    setPossessions([...possessions, newPoss]);
    setShowCreateForm(false);
  };

  const handleDeletePossession = (index) => {
    setPossessions(possessions.filter((_, i) => i !== index));
  };

  const data = {
    labels: dates.map(date => date.toLocaleDateString()),
    datasets: [
      {
        label: "Valeur Totale du Patrimoine",
        data: valuesOverTime,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Patrimoine</h1>

          {/* Section DatePicker et Calcul de Valeur Actuelle */}
          <div className="mb-3">
            <h3>Calcul de la Valeur Actuelle</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              dateFormat="dd/MM/yyyy"
            />
            <Button onClick={handleValidateDate} className="mt-3">
              Calculer Valeur Actuelle
            </Button>
          </div>

          {/* Section Gestion des Possessions */}
          <div className="mb-3">
            <h3>Gestion des Possessions</h3>
            <Button onClick={() => setShowCreateForm(true)} className="mt-3">
              Créer une Possession
            </Button>
          </div>

          {/* Formulaire de création de Possession */}
          <Modal show={showCreateForm} onHide={() => setShowCreateForm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Créer une Nouvelle Possession</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="libelle">
                  <Form.Label>Libellé</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPossession.libelle}
                    onChange={(e) => setNewPossession({ ...newPossession, libelle: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="valeur">
                  <Form.Label>Valeur</Form.Label>
                  <Form.Control
                    type="number"
                    value={newPossession.valeur}
                    onChange={(e) => setNewPossession({ ...newPossession, valeur: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="dateDebut">
                  <Form.Label>Date de Début</Form.Label>
                  <DatePicker
                    selected={newPossession.dateDebut}
                    onChange={(newDate) => setNewPossession({ ...newPossession, dateDebut: newDate })}
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Group>
                <Form.Group controlId="tauxAmortissement">
                  <Form.Label>Taux d'Amortissement</Form.Label>
                  <Form.Control
                    type="number"
                    value={newPossession.tauxAmortissement}
                    onChange={(e) => setNewPossession({ ...newPossession, tauxAmortissement: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
              <Button variant="primary" onClick={handleCreatePossession}>
                Créer
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Tableau des possessions */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libelle</th>
                <th>Valeur Initiale</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Amortissement</th>
                <th>Valeur Actuelle</th>
                <th>Actions</th>
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
                  <td>{validatedDate ? possession.getValeur(validatedDate).toFixed(2) : "N/A"}</td>
                  <td>
                    <Button variant="warning" onClick={() => { /* Logique pour mettre à jour la possession ici */ }}>Mettre à jour</Button>{' '}
                    <Button variant="danger" onClick={() => handleDeletePossession(index)}>Supprimer</Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="6"><strong>Total Valeur Actuelle:</strong></td>
                <td><strong>{totalValeurActuelle.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Section pour la plage de dates et le graphique */}
      <Row>
        <Col>
          <h3>Visualisation de l'évolution du patrimoine</h3>
          <Form>
            <Form.Group>
              <Form.Label>Date de début</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(newDate) => setStartDate(newDate)}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date de fin</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(newDate) => setEndDate(newDate)}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>
            <Button onClick={handleUpdateChart} className="mt-3">Afficher</Button>
          </Form>
          <Line data={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default Patrimoine;
