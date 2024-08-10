import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import data from '../../../data/data.json'
import { Table } from 'react-bootstrap';
import Result from './Components/Result';

function App() {
  const [date, setDateValue] = useState("");
  const [submitDate, setSubmitDate] = useState("");

  function handleDate(event) {
    event.preventDefault();
    setDateValue("");
    setSubmitDate(date)
  }

  return (
    <div className="container">
      <div className='py-2 d-flex justify-content-around align-items-center'>
        <h1>Patrimoine de : {data.possesseur} </h1>
      </div>
      <Table bordered>
        <thead striped>
          <tr>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date de Debut</th>
            <th>Date de Fin</th>
            <th>Taux d'amortissement</th>
          </tr>
        </thead>
        <tbody>
          {data.possessions.map(element => (
            <tr>
              <td className='py-2 px-3'> {element.libelle} </td>
              <td className='py-2 px-3'> {Math.abs(element.valeur) || Math.abs(element.valeurConstante)} </td>
              <td className='py-2 px-3'> {new Date(element.dateDebut).toISOString().split('T')[0]} </td>
              <td className='py-2 px-3'> {element.dateFin || "..."} </td>
              <td className='py-2 px-3'> {element.tauxAmortissement || 0} </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <form onSubmit={handleDate}>
        <input type="date" className='px-2 py-2 mx-3' value={date} onChange={(ev) => setDateValue(ev.target.value)} />
        <Button variant="primary" type='submit'>Valider</Button>
      </form>
      <Result value={submitDate} />
    </div>
  );
}

export default App;
