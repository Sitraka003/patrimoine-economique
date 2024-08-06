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
            <th>Type d'argent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.libelle}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{Math.abs(element.valeur) || Math.abs(element.valeurConstante)}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{new Date(element.dateDebut).toISOString().split('T')[0]}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.dateFin || "..."}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.tauxAmortissement || 0}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.type || ""}</p>
            ))}</td>
          </tr>
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
