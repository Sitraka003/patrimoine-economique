import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

const Possession = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [patrimoine, setPatrimoine] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [patrimoineTotal, setPatrimoineTotal] = useState(null);
  const [newPerson, setNewPerson] = useState({ nom: "", possessions: [] });
  const [newPossession, setNewPossession] = useState({
    type: "",
    libelle: "",
    valeur: "",
    dateDebut: "",
    dateFin: "",
    tauxAmortissement: "",
    valeurConstante: "",
  });

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/persons");
        setPersons(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des personnes", error);
      }
    };
    fetchPersons();
  }, []);

  useEffect(() => {
    if (selectedPerson) {
      const person = persons.find((p) => p.nom === selectedPerson);
      setPatrimoine(person || null);
      setPatrimoineTotal(null);
    }
  }, [selectedPerson, persons]);

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError("");
  };

  const handleAddPerson = async () => {
    if (!newPerson.nom) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/persons",
        newPerson
      );
      setPersons([...persons, response.data]);
      setSelectedPerson(response.data.nom);
      resetNewPersonForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la personne", error);
    }
  };

  const handleAddPossession = () => {
    if (!newPossession.libelle) return;
    setNewPerson((prev) => ({
      ...prev,
      possessions: [...prev.possessions, newPossession],
    }));
    resetNewPossessionForm();
  };

  const handleValider = () => {
    if (!selectedDate) {
      setError("Veuillez sélectionner une date avant de valider.");
      return;
    }

    if (!patrimoine || !patrimoine.possessions) {
      setError("Veuillez sélectionner une personne valide.");
      return;
    }

    const total = patrimoine.possessions.reduce((acc, possession) => {
      return acc + Number(possession.valeur || possession.valeurConstante || 0);
    }, 0);

    setPatrimoineTotal(total);
  };

  const resetNewPersonForm = () => {
    setNewPerson({ nom: "", possessions: [] });
    resetNewPossessionForm();
  };

  const resetNewPossessionForm = () => {
    setNewPossession({
      type: "",
      libelle: "",
      valeur: "",
      dateDebut: "",
      dateFin: "",
      tauxAmortissement: "",
      valeurConstante: "",
    });
  };

  return (
    <div className="container mt-5 p-5 bg-dark text-light rounded-lg shadow-lg">
      <h2 className="text-primary border-bottom pb-2 mb-4">
        Ajouter une nouvelle personne
      </h2>

      <div className="form-group mb-4">
        <label htmlFor="personName" className="text-light">
          Nom
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span
              className="input-group-text bg-secondary text-light border-info"
              id="basic-addon1"
            >
              <i className="fas fa-user"></i>
            </span>
          </div>
          <input
            type="text"
            id="personName"
            className="form-control bg-secondary text-light border-info"
            placeholder="Nom"
            value={newPerson.nom}
            onChange={(e) =>
              setNewPerson({ ...newPerson, nom: e.target.value })
            }
          />
        </div>
      </div>

      <h3 className="text-success border-bottom pb-2 mb-4">
        Ajouter des possessions :
      </h3>

      <div className="form-group mb-4">
        <label htmlFor="possessionType" className="text-light">
          Type
        </label>
        <select
          id="possessionType"
          className="form-control mb-2 bg-secondary text-light border-success"
          value={newPossession.type}
          onChange={(e) =>
            setNewPossession({ ...newPossession, type: e.target.value })
          }
        >
          <option value="">Sélectionner le type</option>
          <option value="BienMateriel">Bien Matériel</option>
          <option value="Flux">Flux</option>
          <option value="Argent">Argent</option>
        </select>

        <label htmlFor="possessionLibelle" className="text-light">
          Libellé
        </label>
        <input
          type="text"
          id="possessionLibelle"
          placeholder="Libellé"
          className="form-control mb-2 bg-secondary text-light border-success"
          value={newPossession.libelle}
          onChange={(e) =>
            setNewPossession({ ...newPossession, libelle: e.target.value })
          }
        />

        <label htmlFor="possessionValeur" className="text-light">
          Valeur
        </label>
        <input
          type="number"
          id="possessionValeur"
          placeholder="Valeur"
          className="form-control mb-2 bg-secondary text-light border-success"
          value={newPossession.valeur}
          onChange={(e) =>
            setNewPossession({ ...newPossession, valeur: e.target.value })
          }
        />

        <label htmlFor="possessionDateDebut" className="text-light">
          Date de début
        </label>
        <input
          type="date"
          id="possessionDateDebut"
          className="form-control mb-2 bg-secondary text-light border-success"
          value={newPossession.dateDebut || ""}
          onChange={(e) =>
            setNewPossession({ ...newPossession, dateDebut: e.target.value })
          }
        />

        <label htmlFor="possessionDateFin" className="text-light">
          Date de fin
        </label>
        <input
          type="date"
          id="possessionDateFin"
          className="form-control mb-2 bg-secondary text-light border-success"
          value={newPossession.dateFin || ""}
          onChange={(e) =>
            setNewPossession({ ...newPossession, dateFin: e.target.value })
          }
        />

        <label htmlFor="possessionTauxAmortissement" className="text-light">
          Taux d'amortissement
        </label>
        <input
          type="number"
          id="possessionTauxAmortissement"
          placeholder="Taux d'amortissement"
          className="form-control mb-2 bg-secondary text-light border-success"
          value={newPossession.tauxAmortissement || ""}
          onChange={(e) =>
            setNewPossession({
              ...newPossession,
              tauxAmortissement: e.target.value,
            })
          }
        />

        <label htmlFor="possessionValeurConstante" className="text-light">
          Valeur constante
        </label>
        <input
          type="number"
          id="possessionValeurConstante"
          placeholder="Valeur constante"
          className="form-control mb-2 bg-secondary text-light border-success"
          value={newPossession.valeurConstante || ""}
          onChange={(e) =>
            setNewPossession({
              ...newPossession,
              valeurConstante: e.target.value,
            })
          }
        />
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-success mb-3 shadow-lg"
          onClick={handleAddPossession}
        >
          Ajouter Possession
        </button>
        <button
          className="btn btn-outline-info mb-3 shadow-lg"
          onClick={handleAddPerson}
        >
          Ajouter Personne
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-4 shadow-sm" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Possession;
