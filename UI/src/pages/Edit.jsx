import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import DatePickerComponent from "../components/DatePicker";

const Edit = () => {
  const [possession, setPossession] = useState(null);
  const [dateDebut, setDateDebut] = useState(new Date());
  const [valeur, setValeur] = useState("");
  const [tauxAmortissement, setTauxAmortissement] = useState("");
  const { libelle } = useParams(); // Récupérer le libelle depuis les paramètres d'URL
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/possession/${libelle}`)
      .then((response) => response.json())
      .then((data) => {
        setPossession(data);
        setDateDebut(new Date(data.dateDebut));
        setValeur(data.valeur || "");
        setTauxAmortissement(data.tauxAmortissement || "");
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération de la possession:", error)
      );
  }, [libelle]);

  const handleSave = () => {
    fetch(`http://localhost:3001/possession/${libelle}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...possession,
        dateDebut: dateDebut.toISOString(),
        valeur: parseFloat(valeur),
        tauxAmortissement: parseFloat(tauxAmortissement) || null,
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/possession");
        } else {
          console.error("Erreur lors de la mise à jour de la possession.");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de la possession:", error)
      );
  };

  if (!possession) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Edit Possession</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Libellé</Form.Label>
          <Form.Control type="text" value={possession.libelle} disabled />
        </Form.Group>
        <DatePickerComponent
          selectedDate={dateDebut}
          onDateChange={setDateDebut}
          label="Date Début"
        />
        <Form.Group className="mb-3">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Taux Amortissement</Form.Label>
          <Form.Control
            type="number"
            value={tauxAmortissement}
            onChange={(e) => setTauxAmortissement(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;
