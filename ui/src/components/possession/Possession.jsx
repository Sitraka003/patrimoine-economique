import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../App.css";
import { FaUser } from "react-icons/fa";
const Possession = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [newPerson, setNewPerson] = useState({ nom: "", possessions: [] });
  const [newPossession, setNewPossession] = useState({
    type: "",
    libelle: "",
    valeur: null,
    dateDebut: "",
    dateFin: "",
    tauxAmortissement: null,
    valeurConstante: null,
    jour: null,
  });

  // Charger les personnes existantes depuis l'API
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/personnes");
        setPersons(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des personnes", error);
      }
    };
    fetchPersons();
  }, []);

  // Ajouter une nouvelle personne avec ses possessions
  const handleAddPerson = async () => {
    if (!newPerson.nom) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/personnes",
        newPerson
      );
      setPersons([...persons, response.data]);
      setSelectedPerson(response.data.nom);
      resetNewPersonForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la personne", error);
    }
  };

  // Ajouter une nouvelle possession à la personne en cours de création
  const handleAddPossession = () => {
    if (!newPossession.libelle) return;
    setNewPerson((prev) => ({
      ...prev,
      possessions: [...prev.possessions, newPossession],
    }));
    resetNewPossessionForm();
  };

  // Réinitialiser le formulaire de nouvelle personne
  const resetNewPersonForm = () => {
    setNewPerson({ nom: "", possessions: [] });
    resetNewPossessionForm();
  };

  // Réinitialiser le formulaire de nouvelle possession
  const resetNewPossessionForm = () => {
    setNewPossession({
      type: "",
      libelle: "",
      valeur: null,
      dateDebut: "",
      dateFin: "",
      tauxAmortissement: null,
      valeurConstante: null,
    });
  };

  return (
    <div className="container container-custom mt-5">
      <h2 className="text-primary-custom border-bottom pb-2 mb-4">
        Ajouter une nouvelle personne
      </h2>

      <div className="form-group mb-4">
        <label htmlFor="personName" className="text-light">
          Nom
        </label>
        <div className="input-group">
          <div className="input-group-prepend input-group-prepend-custom">
            <span
              className="input-group-text bg-secondary text-light border-info"
              id="basic-addon1"
            >
              <FaUser />
            </span>
          </div>
          <input
            type="text"
            id="personName"
            className="form-control form-control-custom"
            placeholder="Nom"
            value={newPerson.nom}
            onChange={(e) =>
              setNewPerson({ ...newPerson, nom: e.target.value })
            }
          />
        </div>
      </div>

      <h3 className="text-success-custom border-bottom pb-2 mb-4">
        Ajouter des possessions :
      </h3>

      <div className="form-group mb-4">
        <label htmlFor="possessionLibelle" className="text-light">
          Libellé
        </label>
        <input
          type="text"
          id="possessionLibelle"
          placeholder="Libellé"
          className="form-control mb-2 form-control-custom"
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
          className="form-control mb-2 form-control-custom"
          value={newPossession.valeur}
          onChange={(e) =>
            setNewPossession({
              ...newPossession,
              valeur: parseFloat(e.target.value) || 0,
            })
          }
        />

        <label htmlFor="possessionDateDebut" className="text-light">
          Date de début
        </label>
        <input
          type="date"
          id="possessionDateDebut"
          className="form-control mb-2 form-control-custom"
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
          className="form-control mb-2 form-control-custom"
          value={newPossession.dateFin || ""}
          onChange={(e) =>
            setNewPossession({ ...newPossession, dateFin: e.target.value })
          }
        />

        <label htmlFor="possessionJour" className="text-light">
          Jour
        </label>
        <input
          type="number"
          id="possessionJour"
          placeholder="Jour (optionel)"
          className="form-control mb-2 form-control-custom"
          value={newPossession.jour || ""}
          onChange={(e) =>
            setNewPossession({
              ...newPossession,
              jour: parseInt(e.target.value) || null,
            })
          }
        />

        <label htmlFor="possessionTauxAmortissement" className="text-light">
          Taux d'amortissement
        </label>
        <input
          type="number"
          id="possessionTauxAmortissement"
          placeholder="Taux d'amortissement"
          className="form-control mb-2 form-control-custom"
          value={newPossession.tauxAmortissement || ""}
          onChange={(e) =>
            setNewPossession({
              ...newPossession,
              tauxAmortissement: parseFloat(e.target.value) || null,
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
          className="form-control mb-2 form-control-custom"
          value={newPossession.valeurConstante || ""}
          onChange={(e) =>
            setNewPossession({
              ...newPossession,
              valeurConstante: parseFloat(e.target.value) || null,
            })
          }
        />
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-success-custom mb-3 shadow-lg"
          onClick={handleAddPossession}
        >
          Ajouter Possession
        </button>
        <button
          className="btn btn-outline-info-custom mb-3 shadow-lg"
          onClick={handleAddPerson}
        >
          Ajouter Personne
        </button>
      </div>
    </div>
  );
};

export default Possession;
