import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import Patrimoine from '../../../models/Patrimoine.js';
import Possession from '../../../models/possessions/Possession.js';
import Flux from "../../../models/possessions/Flux.js";

function PossessionTable({ possessions }) {
  const today = new Date();

  return (
    <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>#</th>
          <th>Libelle</th>
          <th>Valeur initiale (Ariary)</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Amortissement</th>
          <th>Valeur Actuelle (Ariary)</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((item, index) => {
          const possession = item.jour
            ? new Flux(
                item.possesseur,
                item.libelle,
                item.valeurConstante,
                new Date(item.dateDebut),
                item.dateFin ? new Date(item.dateFin) : null,
                item.tauxAmortissement,
                item.jour
              )
            : new Possession(
                item.possesseur,
                item.libelle,
                item.valeur,
                new Date(item.dateDebut),
                item.dateFin ? new Date(item.dateFin) : null,
                item.tauxAmortissement
              );

          const valeurActuelle = possession.getValeur(today);

          return (
            <tr key={`${item.libelle}-${index}`} className='text-center'>
              <td>{index + 1}</td>
              <td>{item.libelle}</td>
              <td className='text-end'>{item.valeur}</td>
              <td>{new Date(item.dateDebut).toLocaleDateString()}</td>
              <td>{item.dateFin ? new Date(item.dateFin).toLocaleDateString() : "-"}</td>
              <td>{item.tauxAmortissement ? item.tauxAmortissement : "-"}</td>
              <td className='text-end'>{valeurActuelle.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [patrimoineValue, setPatrimoineValue] = useState(0);
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/patrimoines'); // Récupère le patrimoine avec ID 1
        const result = await response.json();
        setPossessions(result.possessions); // Accède à la clé "possessions" dans les données
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        alert("Une erreur est survenue lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  const calculatePatrimoineValue = () => {
    if (selectedDate) {
      try {
        const patrimoine = new Patrimoine("John Doe", possessions.map(item =>
          item.jour
            ? new Flux(
                item.possesseur,
                item.libelle,
                item.valeurConstante,
                new Date(item.dateDebut),
                item.dateFin ? new Date(item.dateFin) : null,
                item.tauxAmortissement,
                item.jour
              )
            : new Possession(
                item.possesseur,
                item.libelle,
                item.valeur,
                new Date(item.dateDebut),
                item.dateFin ? new Date(item.dateFin) : null,
                item.tauxAmortissement
              )
        ));

        const patValue = patrimoine.getValeur(selectedDate);
        setPatrimoineValue(patValue);
      } catch (error) {
        console.error("Erreur lors du calcul du patrimoine :", error);
        alert("Une erreur est survenue lors du calcul du patrimoine.");
      }
    } else {
      alert("VEUILLEZ TOUT D'ABORD SÉLECTIONNER UNE DATE\nMERCI");
    }
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h1 className='text-center bordered-title'>Patrimoine économique</h1>
          </div>
        </div>
      </div>
      <PossessionTable possessions={possessions} />
      <div className='dateSelection'>
        <label htmlFor="selectDate">Sélectionner une date :</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="La nouvelle date"
        />
      </div>
      <div className='calcBtn'>
        <Button variant="primary" onClick={calculatePatrimoineValue}>Calculer le patrimoine</Button>{' '}
      </div>
      <div className='calcResult'>
        <p>Patrimoine du possesseur : </p><span className='text-danger'>{patrimoineValue.toFixed(2)} Ariary</span>
      </div>
    </>
  );
}

export default App;
