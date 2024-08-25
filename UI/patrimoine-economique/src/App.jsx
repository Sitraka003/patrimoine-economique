import Table from 'react-bootstrap/Table';
import './App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const PickDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('../data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDateSubmit = () => {
    if (!startDate) {
      setError("Veuillez d'abord choisir une date");
      setFilteredData([]);
      return;
    }

    const possessions = data[1]?.data?.possessions;
    if (!possessions) {
      setError("No possessions data available.");
      setFilteredData([]);
      return;
    }

    const filteredPossessions = possessions.map(item => {
      const start = new Date(item.dateDebut);
      const selectedDate = new Date(startDate);

      if (selectedDate < start) {
        setError("Veuillez choisir une date après la date de début");
        setFilteredData([]);
        return null;
      }

      const calculateCurrentValue = (initialValue, startDate, amortizationRate) => {
        const start = new Date(startDate);
        const now = new Date(selectedDate);

        const elapsedDuration = (now - start) / (1000 * 60 * 60 * 24 * 365);
        const depreciation = amortizationRate / 100 * elapsedDuration;
        const currentValue = initialValue * (1 - depreciation);

        return Math.max(currentValue, 0);
      };

      const currentValue = calculateCurrentValue(item.valeur, item.dateDebut, item.tauxAmortissement);

      return {
        ...item,
        dateFin: selectedDate,
        valeurActuelle: currentValue.toFixed(2),
      };
    }).filter(item => item !== null);
    setError('');
    setFilteredData(filteredPossessions);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="container mt-5">
      <InputGroup className="col justify-content-evenly">
        <h3>Choisissez une date :</h3>
        <div className="d-flex">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control flex-grow-1 border-end-0 rounded-0"
            dateFormat="yyyy/MM/dd"
            style={{ height: 'calc(1.5vh + .75vh + 2px)' }}
          />
          <Button
            as="input"
            type="submit"
            value="Envoyer"
            className='border-start-0 rounded-0'
            style={{ height: 'calc(3vh + .75vh + 2px)' }}
            onClick={handleDateSubmit}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </InputGroup>

      {filteredData.length > 0 && (
        <div className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>LIBELLE</th>
                <th>VALEUR INITIALE</th>
                <th>DEBUT</th>
                <th>FIN</th>
                <th>AMORTISSEMENT</th>
                <th>VALEUR ACTUELLE</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.libelle}</td>
                  <td>{item.valeur} Ar</td>
                  <td>{formatDate(item.dateDebut)}</td>
                  <td>{formatDate(item.dateFin)}</td>
                  <td>{item.tauxAmortissement / 100} </td>
                  <td>{item.valeurActuelle} Ar</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

function GestionPatrimoine() {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch('../data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data.length) {
    return <div>Loading...</div>;
  }

  const possessions = data[1]?.data?.possessions;

  if (!possessions) {
    return <div>No possessions data available.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const calculateCurrentValue = (initialValue, startDate, endDate, amortizationRate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date(currentDate);

    if (now > end) {
      return 0;
    }

    const elapsedDuration = (end - start) / (1000 * 60 * 60 * 24 * 365); // Calculate duration up to "FIN" date
    const depreciation = amortizationRate * elapsedDuration;
    const currentValue = initialValue * (1 - depreciation);

    return Math.max(currentValue, 0);
  };

  const defaultFinDate = formatDate(currentDate); // Default FIN to today's date in yyyy/mm/dd

  return (
    <div className="border border-2" style={{ width: '70vw', height: '30.9vh' }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>LIBELLE</th>
            <th>VALEUR INITIALE</th>
            <th>DEBUT</th>
            <th>FIN</th>
            <th>AMORTISSEMENT</th>
            <th>VALEUR ACTUELLE</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((item, index) => {
            const currentValue = calculateCurrentValue(
              item.valeur,
              item.dateDebut,
              currentDate, // Use today's date for "FIN"
              item.tauxAmortissement / 100
            );

            return (
              <tr key={index}>
                <td>{item.libelle}</td>
                <td>{item.valeur} Ar</td>
                <td>{formatDate(item.dateDebut)}</td>
                <td>{defaultFinDate}</td> {/* Display today's date for "FIN" */}
                <td>{item.tauxAmortissement / 100}</td>
                <td>{currentValue.toFixed(2)} Ar</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}


function App() {
  return (
    <div>
      <thead className='mb-5'>
        <h1>GESTION DE PATRIMOINE</h1>
      </thead>
      <tbody>
        <div>
          <GestionPatrimoine />
        </div>
        <div>
          <PickDate />
        </div>
      </tbody>
    </div>
  );
}

export default App;
