import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Possession from "../../../models/possessions/Possession"; // Assurez-vous que le chemin est correct

const PossessionPage = () => {
  const [possessions, setPossessions] = useState([]);

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
                valeurActuelle: possession.getValeur(currentDate) || "N/A", // Affiche "N/A" si la valeur actuelle est vide
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
    // TODO: Add functionality to create a new possession
    console.log("Create button clicked");
  };

  const handleEdit = (libelle) => {
    // TODO: Add functionality to edit a possession
    console.log("Edit button clicked for:", libelle);
  };

  const handleClose = (libelle) => {
    fetch(`http://localhost:3001/possession/${libelle}/close`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          // Re-fetch possessions to get updated data after closing a possession
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
              <td>{possession.libelle || "N/A"}</td>
              <td>{possession.valeur || "N/A"}</td>
              <td>
                {possession.dateDebut
                  ? new Date(possession.dateDebut).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {possession.dateFin
                  ? new Date(possession.dateFin).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{possession.tauxAmortissement || "N/A"}</td>
              <td>{possession.valeurActuelle || "N/A"}</td>
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
