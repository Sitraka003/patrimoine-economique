import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";

const ShowAll = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [newDateFin, setNewDateFin] = useState("");
  const [newValeur, setNewValeur] = useState("");
  const [newTauxAmortissement, setNewTauxAmortissement] = useState("");
  const [newValeurConstante, setNewValeurConstante] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error("Erreur lors de la requête GET:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => setShowModal(false);

  const handleShow = (type, item) => {
    setEditType(type);
    setCurrentItem(item);
    setNewValue(type === "personne" ? item.data.nom : item.libelle);
    setNewValeur(type === "possession" ? item.valeur : "");
    setNewValeurConstante(type === "possession" ? item.valeurConstante : "");
    setNewTauxAmortissement(
      type === "possession" && item.tauxAmortissement
        ? item.tauxAmortissement
        : ""
    );
    setNewDateFin(
      type === "possession" && item.dateFin
        ? new Date(item.dateFin).toISOString().split("T")[0]
        : ""
    );
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      let url, method, body;
      if (editType === "personne") {
        url = `http://localhost:5000/api/personnes/${currentItem.data.nom}`;
        method = "PUT";
        body = JSON.stringify({ nom: newValue });
      } else if (editType === "possession") {
        url = `http://localhost:5000/api/possessions/${currentItem.possesseur.nom}/${currentItem.libelle}`;
        method = "PUT";
        body = JSON.stringify({
          libelle: newValue,
          valeur: newValeur,
          tauxAmortissement: newTauxAmortissement || null,
          dateFin: newDateFin || null,
          valeurConstante: newValeurConstante || null,
        });
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (response.ok) {
        const updatedData = data.map((item) => {
          if (
            editType === "personne" &&
            item.model === "Personne" &&
            item.data.nom === currentItem.data.nom
          ) {
            return {
              ...item,
              data: { ...item.data, nom: newValue },
            };
          }
          if (
            editType === "possession" &&
            item.model === "Patrimoine" &&
            item.data.possesseur.nom === currentItem.possesseur.nom
          ) {
            const updatedPossessions = item.data.possessions.map((possession) =>
              possession.libelle === currentItem.libelle
                ? {
                    ...possession,
                    libelle: newValue,
                    valeur: newValeur,
                    tauxAmortissement: newTauxAmortissement || null,
                    dateFin: newDateFin || null,
                    valeurConstante: newValeurConstante || null,
                  }
                : possession
            );
            return {
              ...item,
              data: { ...item.data, possessions: updatedPossessions },
            };
          }
          return item;
        });
        setData(updatedData);
        handleClose();
      } else {
        console.error("Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur lors de la requête PUT:", error.message);
    }
  };

  const handleEditPerson = (nom) => {
    handleShow("personne", { data: { nom } });
  };

  const handleDeletePerson = async (nom) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette personne" ?`
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/personnes/${nom}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedData = data.filter((item) => {
          if (item.model === "Personne" && item.data.nom === nom) {
            return false;
          }

          if (item.model === "Patrimoine" && item.data.possesseur.nom === nom) {
            return false;
          }

          return true;
        });

        setData(updatedData);
      } else {
        console.error("Erreur lors de la suppression de la personne");
      }
    } catch (error) {
      console.error("Erreur lors de la requête DELETE:", error.message);
    }
  };

  const handleClosePossession = async (possession, possesseurNom) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir clôturer la possession "${possession.libelle}" ?`
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/possessions/${possesseurNom}/${possession.libelle}/close`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        const updatedData = data.map((item) => {
          if (
            item.model === "Patrimoine" &&
            item.data.possesseur.nom === possesseurNom
          ) {
            const updatedPossessions = item.data.possessions.map((p) =>
              p.libelle === possession.libelle
                ? { ...p, dateFin: new Date().toLocaleDateString() }
                : p
            );
            return {
              ...item,
              data: { ...item.data, possessions: updatedPossessions },
            };
          }
          return item;
        });
        setData(updatedData);
      } else {
        console.error("Erreur lors de la clôture de la possession");
      }
    } catch (error) {
      console.error("Erreur lors de la requête PUT:", error.message);
    }
  };

  const handleEdit = (possession) => {
    handleShow("possession", possession);
  };

  const handleDelete = async (possession, possesseurNom) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la possession "${possession.libelle}" ?`
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/possessions/${possesseurNom}/${possession.libelle}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedData = data.map((item) => {
          if (
            item.model === "Patrimoine" &&
            item.data.possesseur.nom === possesseurNom
          ) {
            const filteredPossessions = item.data.possessions.filter(
              (p) => p.libelle !== possession.libelle
            );
            return {
              ...item,
              data: {
                ...item.data,
                possessions: filteredPossessions,
              },
            };
          }
          return item;
        });
        setData(updatedData);
      } else {
        console.error("Erreur lors de la suppression de la possession");
      }
    } catch (error) {
      console.error("Erreur lors de la requête DELETE:", error);
    }
  };

  const formatData = (item) => {
    if (item.model === "Personne") {
      return (
        <>
          <div className="d-flex justify-content-between align-items-center p-3 bg-dark-custom rounded shadow-sm mb-3">
            <span className="fw-bold px-3">{item.data.nom}</span>
            <div>
              <button
                className="btn btn-link text-warning p-1"
                onClick={() => handleEditPerson(item.data.nom)}
              >
                <BiEdit style={{ fontSize: "22px", color: "orange" }} />
              </button>
              <button
                className="btn btn-link text-danger p-1"
                onClick={() => handleDeletePerson(item.data.nom)}
              >
                <MdDelete style={{ fontSize: "22px", color: "red" }} />
              </button>
            </div>
          </div>
          <hr className="my-2 border border-1" />
        </>
      );
    } else if (item.model === "Patrimoine") {
      const { possesseur, possessions } = item.data;
      return (
        <div className="card mb-3 bg-secondary text-white border-0 rounded shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover table-dark rounded">
              <thead>
                <tr>
                  <th>Libellé</th>
                  <th>Valeur</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Taux Amortissement</th>
                  <th>Valeur Constante</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {possessions.map((possession, index) => (
                  <tr key={index}>
                    <td>{possession.libelle}</td>
                    <td>{possession.valeur}</td>
                    <td>
                      {new Date(possession.dateDebut).toLocaleDateString()}
                    </td>
                    <td>
                      {possession.dateFin
                        ? new Date(possession.dateFin).toLocaleDateString()
                        : "Non définie"}
                    </td>
                    <td>{possession.tauxAmortissement || "N/A"}</td>
                    <td>{possession.valeurConstante || "N/A"}</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn btn-link text-warning p-1"
                        onClick={() => handleEdit(possession)}
                      >
                        <BiEdit style={{ fontSize: "22px", color: "orange" }} />
                      </button>
                      <button
                        className="btn btn-link text-danger p-1"
                        onClick={() => handleDelete(possession, possesseur.nom)}
                      >
                        <MdDelete style={{ fontSize: "23px", color: "red" }} />
                      </button>
                      <button
                        className="btn btn-link text-info p-1"
                        onClick={() =>
                          handleClosePossession(possession, possesseur.nom)
                        }
                      >
                        <IoIosCloseCircleOutline
                          style={{ fontSize: "24px", color: "#696969" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="container bg-dark my-4">
        {data.map((item, index) => (
          <React.Fragment key={index}>{formatData(item)}</React.Fragment>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title>
            {editType === "personne"
              ? "Modifier Personne"
              : "Modifier Possession"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group controlId="formBasicValue">
              <Form.Label>
                {editType === "personne" ? "Nom" : "Libellé"}
              </Form.Label>
              <Form.Control
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </Form.Group>
            {editType === "possession" && (
              <>
                <Form.Group controlId="formBasicValeur">
                  <Form.Label>Valeur</Form.Label>
                  <Form.Control
                    type="number"
                    value={newValeur}
                    onChange={(e) => setNewValeur(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicDateFin">
                  <Form.Label>Date Fin</Form.Label>
                  <Form.Control
                    type="date"
                    value={
                      newDateFin
                        ? new Date(newDateFin).toISOString().substring(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      setNewDateFin(new Date(e.target.value).toISOString())
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicTauxAmortissement">
                  <Form.Label>Taux d'Amortissement</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={newTauxAmortissement}
                    onChange={(e) =>
                      setNewTauxAmortissement(Number(e.target.value))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicValeurConstante">
                  <Form.Label>Valeur Constante</Form.Label>
                  <Form.Control
                    type="number"
                    value={newValeurConstante}
                    onChange={(e) => setNewValeurConstante(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowAll;
