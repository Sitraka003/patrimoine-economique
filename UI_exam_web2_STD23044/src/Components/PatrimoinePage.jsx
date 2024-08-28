import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import data from '../../../data/data.json';
import Patrimoine from '../../../models/Patrimoine.js';
import Possession from '../../../models/possessions/Possession.js';
import Flux from '../../../models/possessions/Flux.js';
import '../App.css';

function PatrimoinePage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [patrimoineValue, setPatrimoineValue] = useState(0);

  const calculatePatrimoineValue = () => {
    if (selectedDate) {
      const possessions = data[1].data.possessions.map(item =>
        item.jour ? new Flux(
          item.possesseur,
          item.libelle,
          item.valeurConstante,
          new Date(item.dateDebut),
          item.dateFin ? new Date(item.dateFin) : null,
          item.tauxAmortissement,
          item.jour
        ) : new Possession(
          item.possesseur,
          item.libelle,
          item.valeur,
          new Date(item.dateDebut),
          item.dateFin ? new Date(item.dateFin) : null,
          item.tauxAmortissement
        )
      );

      const patrimoine = new Patrimoine("John Doe", possessions);
      const patValue = patrimoine.getValeur(selectedDate);
      setPatrimoineValue(patValue);

    } else {
      alert("VEUILLEZ TOUT D'ABORD SÉLECTIONNER UNE DATE\nMERCI");
    }
  };

  return (
    <div className='container mt-5 d-flex align-items-center justify-content-center min-vh-50'>
      <div className='w-100'>
        <div className='row justify-content-center mb-4'>
          <div className='col-md-6'>
            <h1 className='text-center bordered-title'>Calcul du Patrimoine</h1>
          </div>
        </div>
        <div className='row justify-content-center mb-4'>
          <div className='col-md-6'>
            <div className='dateSelection mb-3'>
              <label htmlFor="selectDate" className='form-label'>Sélectionner une date :</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="La nouvelle date"
              />
            </div>
          </div>
        </div>
        <div className='row justify-content-center mb-4'>
          <div className='col-md-6 text-center'>
            <Button variant="primary" onClick={calculatePatrimoineValue}>Calculer le patrimoine</Button>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-6 text-center'>
            <p>Patrimoine du possesseur : </p>
            <span className='text-danger'>{patrimoineValue.toFixed(2)} Ariary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatrimoinePage;
