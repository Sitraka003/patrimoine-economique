import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importer le hook useNavigate
import Possession from "../../../models/possessions/Possession";

const PossessionPage = () => {
  const [possessions, setPossessions] = useState([]);
  const navigate = useNavigate(); // Initialiser le hook useNavigate

  useEffect(() => {
    fetchPossessions();
  }, []);

  const fetchPossessions = () => {
    fetch("http://localhost:3001/possession")
      .then((response) => response.json())
      .then((data) => {
        const patrimoineData = data.find((item) => item.model === "Patrimoine");
        if (patrimoineData) {
          const currentDate = new Date();
          const updatedPossessions = patrimoineData.data.possessions.map(
            (possessionData) => {
              const possession = new Possession(
                possessionData.possesseur,
                possessionData.libelle,
                possessionData.valeur,
                new Date(possessionData.dateDebut),
                possessionData.dateFin
                  ? new Date(possessionData.dateFin)
                  : null,
                possessionData.tauxAmortissement
              );
              return {
                ...possessionData,
                valeurActuelle: possession.getValeur(currentDate) || "-",
              };
            }
          );
          setPossessions(updatedPossessions);
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des possessions:", error)
      );
  };

  const handleCreate = () => {
    navigate("/create"); // Rediriger vers la page Create
  };

  const handleEdit = (libelle) => {
    navigate(`/edit/${libelle}`); // Rediriger vers la page Edit
  };

  const handleClose = (libelle) => {
    fetch(`http://localhost:3001/possession/${libelle}/close`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          fetchPossessions();
        } else {
          console.error("Erreur lors de la fermeture de la possession.");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la fermeture de la possession:", error)
      );
  };

  return (
    <Container>
      <h1>Possessions</h1>
      <Button onClick={handleCreate} variant="primary">
        Create
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux Amortissement</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession) => (
            <tr key={possession.libelle}>
              <td>{possession.libelle || "-"}</td>
              <td>{possession.valeur || "-"}</td>
              <td>
                {possession.dateDebut
                  ? new Date(possession.dateDebut).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                {possession.dateFin
                  ? new Date(possession.dateFin).toLocaleDateString()
                  : "-"}
              </td>
              <td>{possession.tauxAmortissement || "-"}</td>
              <td>{possession.valeurActuelle || "-"}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(possession.libelle)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleClose(possession.libelle)}
                >
                  Close
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PossessionPage;
