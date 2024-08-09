import React, { useState, useEffect } from 'react';
import PossessionsTable from './components/PossessionsTable.jsx';
import WealthCalculator from './components/WealthCalculator.jsx';
import Patrimoine from './models/Patrimoine.js';
import BienMateriel from './models/possessions/BienMateriel.js';
import Argent from './models/possessions/Argent.js';
import Flux from './models/possessions/Flux.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Personne from './models/Personne.js';
import './App.css';

function App() {
  const [patrimoine, setPatrimoine] = useState(null);
  const [calculatedWealth, setCalculatedWealth] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('/data/data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched:', data);

        const patrimoineData = data.find(item => item.model === 'Patrimoine');
        if (!patrimoineData) {
          throw new Error('Patrimoine data not found in JSON');
        }
        console.log('Patrimoine data:', patrimoineData);

        const { possessions, possesseur } = patrimoineData.data;

        const possessionsInstances = possessions.map(possession => {
          const possesseurInstance = new Personne(possession.possesseur.nom);

          switch (possession.type) {
            case 'BienMateriel':
              return new BienMateriel(
                possesseurInstance,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                possession.dateFin ? new Date(possession.dateFin) : null,
                possession.tauxAmortissement
              );
            case 'Argent':
              return new Argent(
                possesseurInstance,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                possession.dateFin ? new Date(possession.dateFin) : null,
                possession.tauxAmortissement,
                possession.type
              );
            case 'Flux':
              return new Flux(
                possesseurInstance,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                possession.dateFin ? new Date(possession.dateFin) : null,
                possession.tauxAmortissement,
                possession.jour,
                possession.valeurConstante
              );
            default:
              console.warn('Unknown possession type:', possession.type);
              return null;
          }
        }).filter(possession => possession !== null);

        console.log('Possessions instances:', possessionsInstances);

        const newPatrimoine = new Patrimoine(new Personne(patrimoineData.data.possesseur.nom), possessionsInstances);
        setPatrimoine(newPatrimoine);

        // Calculate initial wealth
        const initialWealth = newPatrimoine.getValeur(new Date());
        setCalculatedWealth(initialWealth);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <img src="/myImage.png" alt="Description of Image" className='logo'/>


      <h1 className="text-center fw-bold m-3 underline">Wealth Management</h1>

       {error ? (
        <p style={{ color: 'red' }}>Erreur: {error}</p>
      ) : patrimoine && (
        <>
          <PossessionsTable possessions={patrimoine.possessions} />
          <WealthCalculator
            patrimoine={patrimoine}
            setCalculatedWealth={setCalculatedWealth}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <h2 className="text-center my-4 text-dark font-weight-bold">
        Total Wealth: {calculatedWealth.toFixed(2)} Ar
      </h2>
        </>
      )}
    </div>
  );
}

export default App;
