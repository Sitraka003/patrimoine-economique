import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../components/DatePicker";
import LineChart from "../components/LineChart";

const PatrimoinePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const [timeUnit, setTimeUnit] = useState("jour");
  const [specificDate, setSpecificDate] = useState(new Date());
  const [patrimoineValeur, setPatrimoineValeur] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/patrimoine/range", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: timeUnit,
          dateDebut: startDate.toISOString().split("T")[0],
          dateFin: endDate.toISOString().split("T")[0],
        }),
      });
      const data = await response.json();
      setChartData(data.valeur);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const fetchPatrimoineValeur = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/patrimoine/${
          specificDate.toISOString().split("T")[0]
        }`
      );
      const data = await response.json();
      setPatrimoineValeur(data.valeur);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la valeur du patrimoine:",
        error
      );
    }
  };

  return (
    <Container>
      <h1 className="my-4">Patrimoine</h1>
      <Row className="mb-3">
        <Col>
          <DatePicker
            selectedDate={startDate}
            onDateChange={setStartDate}
            label="Date de début"
          />
        </Col>
        <Col>
          <DatePicker
            selectedDate={endDate}
            onDateChange={setEndDate}
            label="Date de fin"
          />
        </Col>
        <Col>
          <Form.Group controlId="timeUnitSelect">
            <Form.Label>Unité de temps</Form.Label>
            <Form.Control
              as="select"
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
            >
              <option value="jour">Jour</option>
              <option value="mois">Mois</option>
              <option value="année">Année</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" onClick={fetchData}>
        Validate
      </Button>
      <div className="mt-4">
        <LineChart data={chartData} />
      </div>

      <Row className="mt-4">
        <Col>
          <DatePicker
            selectedDate={specificDate}
            onDateChange={setSpecificDate}
            label="Sélectionnez une date"
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={fetchPatrimoineValeur}>
            Validate
          </Button>
        </Col>
      </Row>

      {patrimoineValeur !== null && (
        <div className="mt-3">
          <h5>
            Valeur du patrimoine à la date sélectionnée: {patrimoineValeur}
          </h5>
        </div>
      )}
    </Container>
  );
};

export default PatrimoinePage;
