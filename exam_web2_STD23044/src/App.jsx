import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import data from './data.json';
import Patrimoine from '../../models/Patrimoine.js';
import Possession from '../../models/possessions/Possession.js';
import './App.css'

function MyTable() {
  const today = new Date(Date.now());

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
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
        {data.map((item, index) => {
          const possession = new Possession(
            item.Possesseur,
            item.Libelle,
            item.ValeurInitiale,
            new Date(item.DateDeDebut),
            new Date(item.DateDeFin),
            item.Amortissement
          );

          const valeurActuelle = possession.getValeur(today);

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.Libelle}</td>
              <td>{item.ValeurInitiale}</td>
              <td>{item.DateDeDebut}</td>
              <td>{item.DateDeFin}</td>
              <td>{item.Amortissement}</td>
              <td>{valeurActuelle.toFixed(2)}</td>
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

  const calculatePatrimoineValue = () => {
    if (selectedDate) {
      const possessions = data.map(item => new Possession(
        item.Possesseur,
        item.Libelle,
        item.ValeurInitiale,
        new Date(item.DateDeDebut),
        new Date(item.DateDeFin),
        item.Amortissement
      ));

      const patrimoine = new Patrimoine("Fanantenana Ny Aina", possessions);
      const patVlaue = patrimoine.getValeur(selectedDate);
      setPatrimoineValue(patVlaue);
    }

    else {
      alert("VEUILLEZ TOUT D'ABORD SELECTIONNE UNE DATE\nMERCI")
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h1 className='text-center bordered-title'>Patrimoine économique</h1>
          </div>
        </div>
      </div>
      <MyTable />
      <div className='dateSelection'>
        <label htmlFor="selectDate">Sélectionner une date :</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
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
