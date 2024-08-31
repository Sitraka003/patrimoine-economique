// ... autres importations
import React, { useState, useEffect } from "react";
import data from "../../data/data.json";
import Argent from "../../models/possessions/Argent.js";
import BienMateriel from "../../models/possessions/BienMateriel.js";
import Flux from "../../models/possessions/Flux.js";
import Patrimoine from "../../models/Patrimoine.js";
import LineChart from "./components/chart/LineChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import "./App.css";

const PatrimoineApp = () => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [patrimoine, setPatrimoine] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [patrimoineTotal, setPatrimoineTotal] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingPossession, setEditingPossession] = useState(null);
  const [editError, setEditError] = useState("");
  const [chartData, setChartData] = useState([]);

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
      setPatrimoineTotal(null);
    }
  }, [selectedPerson]);

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError("");
    setPatrimoineTotal(null);
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

    // Préparation des données pour les graphiques
    const chartData = patrimoine.possessions.map((possession) => ({
      libelle: possession.libelle,
      valeur: calculerValeurActuelle(possession, selectedDate),
    }));
    setChartData(chartData);
  };

  return (
    <div className="container mt-5 bg-dark text-light">
      <h1 className="mb-4 text-center text-primary">
        Calculateur de Patrimoine
      </h1>
      <div className="mb-3">
        <label htmlFor="personSelect" className="form-label">
          Sélectionnez une personne :
        </label>
        <select
          id="personSelect"
          className="form-select bg-secondary text-light"
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
          <table className="table table-striped table-hover table-dark">
            <thead>
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

          <div className="mb-3">
            <label htmlFor="dateSelect" className="form-label">
              Sélectionnez une date :
            </label>
            <input
              type="date"
              id="dateSelect"
              className="form-control bg-secondary text-light"
              onChange={handleDateChange}
              value={selectedDate}
            />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button className="btn btn-primary mt-2" onClick={handleValider}>
              Valider
            </button>
            {patrimoineTotal !== null && (
              <div className="alert alert-info mt-3">
                Valeur Totale du Patrimoine: {patrimoineTotal.toFixed(2)} Ar
              </div>
            )}
          </div>
          {chartData.length > 0 && <LineChart data={chartData} />}
        </div>
      )}
    </div>
  );
};

export default PatrimoineApp;
