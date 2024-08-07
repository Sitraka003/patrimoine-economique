import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import data from './data.json';

function MyTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Libelle</th>
          <th>Valeur intiale (Ariary)</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Amortissement</th>
          <th>Valeur actuelle (Ariary)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Libelle}</td>
            <td>{item.ValeurInitiale}</td>
            <td>{item.DateDeDebut}</td>
            <td>{item.DateDeFin}</td>
            <td>{item.Amortissement}</td>
            <td>{item.ValeurActuelle}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <h1>Patrimoine économique</h1>
      <MyTable />
      <div className='dateSelection'>
        <div className='ms-1'>
          <label htmlFor="selectDate">Sélectionner une date :</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
          />
          <Button variant="primary" onClick={() => console.log(selectedDate)}>Valider</Button>{' '}
        </div>
      </div>
      <div className='calcResult'>
        <p>Patrimoine du possesseur :</p>
      </div>
    </>
  );
}

export default App;
