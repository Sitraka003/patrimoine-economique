import React, { useState, useEffect } from "react";
import data from "../../../../data/data.json";
import Argent from "../../../../models/possessions/Argent.js";
import BienMateriel from "../../../../models/possessions/BienMateriel.js";
import Flux from "../../../../models/possessions/Flux.js";
import Patrimoine from "../../../../models/Patrimoine.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import "../../App.css";
import ChartComponent from "../chart/LineChart.jsx";

const PatrimoineApp = () => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [patrimoine, setPatrimoine] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [patrimoineTotal, setPatrimoineTotal] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Valeur des possessions",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  });
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (selectedPerson) {
      console.log("Recherche du patrimoine pour : ", selectedPerson);

      const patrimoineData = data.find(
        (item) =>
          item.model === "Patrimoine" &&
          item.data.possesseur.nom === selectedPerson
      );

      console.log("Données de patrimoine trouvées :", patrimoineData);

      if (patrimoineData) {
        const possessionsInstances = patrimoineData.data.possessions
          .map((possession) => {
            if (!possession || !possession.libelle) return null;
            if (possession.valeurConstante !== undefined) {
              return new Flux(
                selectedPerson,
                possession.libelle,
                possession.valeurConstante,
                new Date(possession.dateDebut),
                possession.dateFin ? new Date(possession.dateFin) : null,
                possession.tauxAmortissement,
                possession.jour
              );
            } else if (possession.valeur !== undefined) {
              if (possession.tauxAmortissement !== null) {
                return new BienMateriel(
                  selectedPerson,
                  possession.libelle,
                  possession.valeur,
                  new Date(possession.dateDebut),
                  possession.dateFin ? new Date(possession.dateFin) : null,
                  possession.tauxAmortissement
                );
              } else {
                return new Argent(
                  selectedPerson,
                  possession.libelle,
                  possession.valeur,
                  new Date(possession.dateDebut),
                  possession.dateFin ? new Date(possession.dateFin) : null
                );
              }
            }
            return null;
          })
          .filter((item) => item !== null);

        setPatrimoine(new Patrimoine(selectedPerson, possessionsInstances));
        setPatrimoineTotal(null);
      } else {
        setPatrimoine(null);
        console.log("Aucun patrimoine trouvé pour cette personne.");
      }
    }
  }, [selectedPerson, selectedDate]);

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError("");
  };

  const calculerValeurActuelle = (possession, date) => {
    if (!possession) return 0;
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
    if (!selectedDate || !selectedPerson) {
      setError(
        "Veuillez sélectionner une date et une personne avant de valider."
      );
      return;
    }

    if (patrimoine && patrimoine.possessions) {
      const valeurs = patrimoine.possessions.map((possession) =>
        calculerValeurActuelle(possession, selectedDate)
      );

      const total = valeurs.reduce((acc, curr) => acc + curr, 0);
      setPatrimoineTotal(total);

      const labels = patrimoine.possessions.map(
        (p) => p.libelle || "Non spécifié"
      );
      const dataValues = valeurs;

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Valeur des possessions",
            data: dataValues,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
          },
        ],
      });

      setShowChart(true);
    }
  };

  return (
    <div className="container mt-5 bg-dark text-light">
      <h1 className="mb-4 text-center text-white">Calculateur de Patrimoine</h1>
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
          {data
            .filter((item) => item.model === "Personne")
            .map((person) => (
              <option key={person.data.nom} value={person.data.nom}>
                {person.data.nom}
              </option>
            ))}
        </select>
      </div>

      {patrimoine &&
      patrimoine.possessions &&
      patrimoine.possessions.length > 0 ? (
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
                  <td>{possession.libelle || "Non spécifié"}</td>
                  <td>
                    {possession.valeur
                      ? possession.valeur + " Ar"
                      : possession.valeurConstante
                      ? possession.valeurConstante + " Ar"
                      : "N/A"}
                  </td>
                  <td>
                    {possession.dateDebut
                      ? possession.dateDebut.toISOString().split("T")[0]
                      : "Non spécifiée"}
                  </td>
                  <td>
                    {possession.dateFin
                      ? new Date(possession.dateFin).toLocaleDateString()
                      : "Non définie"}
                  </td>
                  <td>
                    {possession.tauxAmortissement !== null
                      ? possession.tauxAmortissement + " %"
                      : "N/A"}
                  </td>
                  <td>
                    {selectedDate
                      ? calculerValeurActuelle(
                          possession,
                          selectedDate
                        ).toFixed(2) + " Ar"
                      : "Sélectionnez une date"}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => console.log(`Éditer possession ${index}`)}
                    >
                      <Link to="/show" className="nav-link text-light">
                        <FaEdit />
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <label htmlFor="dateInput" className="form-label">
              Sélectionnez une date :
            </label>
            <input
              type="date"
              id="dateInput"
              className="form-control"
              onChange={handleDateChange}
              value={selectedDate}
            />
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-primary mt-3" onClick={handleValider}>
              Valider
            </button>

            {patrimoineTotal !== null && (
              <h2
                className={`mt-4 p-2 rounded ${
                  patrimoineTotal <= 0 ? "bg-danger" : "bg-success"
                }`}
              >
                Valeur totale du patrimoine : {patrimoineTotal.toFixed(2)} Ar
              </h2>
            )}

            {showChart && <ChartComponent chartData={chartData} />}
          </div>
        </div>
      ) : (
        <p className="text-warning">
          Aucune possession trouvée
        </p>
      )}
    </div>
  );
};

export default PatrimoineApp;
