import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Possession from "../../../models/possessions/Possession";
import Flux from "../../../models/possessions/Flux";

const PossessionPage = () => {
  const [possessions, setPossessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPossessions();
  }, []);

  const fetchPossessions = () => {
    fetch("https://patrimoine-economique-hnz4.onrender.com/possession")
      .then((response) => response.json())
      .then((data) => {
        const patrimoineData = data.find((item) => item.model === "Patrimoine");
        if (patrimoineData) {
          const currentDate = new Date();
          const updatedPossessions = patrimoineData.data.possessions.map(
            (possessionData) => {
              let possession;
              if (
                possessionData.jour !== undefined &&
                possessionData.valeurConstante !== undefined
              ) {
                possession = new Flux(
                  possessionData.possesseur,
                  possessionData.libelle,
                  possessionData.valeur,
                  new Date(possessionData.dateDebut),
                  possessionData.dateFin
                    ? new Date(possessionData.dateFin)
                    : null,
                  possessionData.tauxAmortissement,
                  possessionData.jour
                );
              } else {
                possession = new Possession(
                  possessionData.possesseur,
                  possessionData.libelle,
                  possessionData.valeur,
                  new Date(possessionData.dateDebut),
                  possessionData.dateFin
                    ? new Date(possessionData.dateFin)
                    : null,
                  possessionData.tauxAmortissement
                );
              }
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
    navigate("/create");
  };

  const handleEdit = (libelle) => {
    navigate(`/edit/${libelle}`);
  };

  const handleClose = (libelle) => {
    fetch(
      `https://patrimoine-economique-hnz4.onrender.com/possession/${libelle}/close`,
      {
        method: "POST",
      }
    )
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
      <h1 className="fw-normal text-secondary mt-5">List of Possessions</h1>
      <Button
        className="mt-4 fs-5 px-4 bg-light text-info border border-2 border-info"
        onClick={handleCreate}
      >
        Create
      </Button>
      <Table className="table table-hover my-5 text-left">
        <thead className="fs-5 border-bottom border-secondary">
          <tr>
            <th>Label</th>
            <th className="text-center">Value</th>
            <th className="text-center">Current Value</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td className="text-center">{possession.valeur}</td>
              <td className="text-center">{possession.valeurActuelle}</td>
              <td className="text-center">
                <Button
                  variant="secondary"
                  className="me-2"
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
