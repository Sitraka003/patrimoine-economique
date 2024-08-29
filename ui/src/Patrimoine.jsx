import React, { useState, useEffect } from "react";
import data from "../../data/data.json";
import Argent from "../../models/possessions/Argent.js";
import BienMateriel from "../../models/possessions/BienMateriel.js";
import Flux from "../../models/possessions/Flux.js";
import Patrimoine from "../../models/Patrimoine.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "./App.css";

const PatrimoineApp = () => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [patrimoine, setPatrimoine] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [patrimoineTotal, setPatrimoineTotal] = useState(null);

  // État pour la gestion des modals
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingPossession, setEditingPossession] = useState(null);

  useEffect(() => {
    const person = data.find((p) => p.nom === selectedPerson);
    if (person) {
      const possessionsInstances = person.possessions.map((possession) => {
        switch (possession.type) {
          case "Argent":
            return new Argent(
              person.nom,
              possession.libelle,
              possession.valeur,
              new Date(possession.dateDebut),
              possession.dateFin ? new Date(possession.dateFin) : null,
              possession.tauxAmortissement,
              possession.typeArgent
            );
          case "BienMateriel":
            return new BienMateriel(
              person.nom,
              possession.libelle,
              possession.valeur,
              new Date(possession.dateDebut),
              possession.dateFin ? new Date(possession.dateFin) : null,
              possession.tauxAmortissement
            );
          case "Flux":
            return new Flux(
              person.nom,
              possession.libelle,
              possession.valeurConstante,
              new Date(possession.dateDebut),
              possession.dateFin ? new Date(possession.dateFin) : null,
              possession.tauxAmortissement,
              possession.jour
            );
          default:
            return null;
        }
      });
      setPatrimoine(new Patrimoine(person.nom, possessionsInstances));
      setPatrimoineTotal(null); // Réinitialiser la somme du patrimoine total
    }
  }, [selectedPerson]);

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError("");
  };

  const calculerValeurActuelle = (possession, date) => {
    let valeurActuelle = possession.getValeurApresAmortissement(new Date(date));
    if (possession.valeur === 0 && possession.valeurConstante) {
      const dateDebut = new Date(possession.dateDebut);
      const moisDiff =
        (new Date(date).getFullYear() - dateDebut.getFullYear()) * 12 +
        (new Date(date).getMonth() - dateDebut.getMonth());
      if (moisDiff >= 1) {
        valeurActuelle += moisDiff * possession.valeurConstante;
      }
    }
    return valeurActuelle;
  };

  const handleValider = () => {
    if (!selectedDate) {
      setError("Veuillez sélectionner une date avant de valider.");
      return;
    }

    const valeurs = patrimoine.possessions.map((possession) =>
      calculerValeurActuelle(possession, selectedDate)
    );

    const total = valeurs.reduce((acc, curr) => acc + curr, 0);
    setPatrimoineTotal(total);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingPossession({ ...patrimoine.possessions[index] });
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingPossession) {
      const updatedPossessions = patrimoine.possessions.map(
        (possession, index) =>
          index === editingIndex ? { ...editingPossession } : possession
      );
      setPatrimoine({ ...patrimoine, possessions: updatedPossessions });
      setEditingIndex(null);
      setEditingPossession(null);
    }
  };

  const handleDelete = (index) => {
    const updatedPossessions = patrimoine.possessions.filter(
      (_, i) => i !== index
    );
    setPatrimoine({ ...patrimoine, possessions: updatedPossessions });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">
        Calculateur de Patrimoine
      </h1>
      <div className="mb-3">
        <label htmlFor="personSelect" className="form-label">
          Sélectionnez une personne :
        </label>
        <select
          id="personSelect"
          className="form-select"
          onChange={handleChange}
          value={selectedPerson}
        >
          <option value="">--Veuillez sélectionner une personne--</option>
          {data.map((person) => (
            <option key={person.nom} value={person.nom}>
              {person.nom}
            </option>
          ))}
        </select>
      </div>

      {patrimoine && patrimoine.possessions.length > 0 && (
        <div className="mt-4">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Libelle</th>
                <th>Valeur Initiale</th>
                <th>Date de début</th>
                <th>Date Fin</th>
                <th>Taux d'Amortissement</th>
                <th>Valeur Actuelle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patrimoine.possessions.map((possession, index) => (
                <tr key={index}>
                  <td>{possession.libelle}</td>
                  <td>{`${
                    possession.valeur || possession.valeurConstante
                  } Ar`}</td>
                  <td>{possession.dateDebut.toISOString().split("T")[0]}</td>
                  <td>
                    {possession.dateFin
                      ? possession.dateFin.toLocaleDateString()
                      : "Non définie"}
                  </td>
                  <td>
                    {possession.tauxAmortissement !== null
                      ? `${possession.tauxAmortissement} %`
                      : "N/A"}
                  </td>
                  <td>
                    {selectedDate
                      ? `${calculerValeurActuelle(
                          possession,
                          selectedDate
                        ).toFixed(2)} Ar`
                      : "Sélectionnez une date"}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit />
                      
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash />
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <label htmlFor="dateInput" className="form-label">
              Choisissez une date :
            </label>
            <div className="input-group">
              <input
                type="date"
                id="dateInput"
                className="form-control"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <button className="btn btn-success" onClick={handleValider}>
                Valider
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {patrimoineTotal !== null && (
            <div>
              <h2 className="mt-4 text-success">
                Valeur totale du patrimoine : {patrimoineTotal.toFixed(2)} Ar
              </h2>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Modifier la Possession
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {editingPossession && (
                <div>
                  <div className="mb-3">
                    <label htmlFor="modalLibelle" className="form-label">
                      Libelle :
                    </label>
                    <input
                      type="text"
                      id="modalLibelle"
                      className="form-control"
                      value={editingPossession.libelle}
                      onChange={(e) =>
                        setEditingPossession({
                          ...editingPossession,
                          libelle: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="modalValeur" className="form-label">
                      Valeur Initiale :
                    </label>
                    <input
                      type="number"
                      id="modalValeur"
                      className="form-control"
                      value={
                        editingPossession.valeur ||
                        editingPossession.valeurConstante
                      }
                      onChange={(e) =>
                        setEditingPossession({
                          ...editingPossession,
                          valeur: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="modalDateDebut" className="form-label">
                      Date de début :
                    </label>
                    <input
                      type="date"
                      id="modalDateDebut"
                      className="form-control"
                      value={
                        editingPossession.dateDebut.toISOString().split("T")[0]
                      }
                      onChange={(e) =>
                        setEditingPossession({
                          ...editingPossession,
                          dateDebut: new Date(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="modalDateFin" className="form-label">
                      Date Fin :
                    </label>
                    <input
                      type="date"
                      id="modalDateFin"
                      className="form-control"
                      value={
                        editingPossession.dateFin
                          ? editingPossession.dateFin
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditingPossession({
                          ...editingPossession,
                          dateFin: e.target.value
                            ? new Date(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="modalTauxAmortissement"
                      className="form-label"
                    >
                      Taux d'Amortissement :
                    </label>
                    <input
                      type="number"
                      id="modalTauxAmortissement"
                      className="form-control"
                      value={editingPossession.tauxAmortissement || ""}
                      onChange={(e) =>
                        setEditingPossession({
                          ...editingPossession,
                          tauxAmortissement: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveEdit}
                data-bs-dismiss="modal"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatrimoineApp;
