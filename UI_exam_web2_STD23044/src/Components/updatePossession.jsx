import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function UpdatePossessionPage() {
  const { libelle } = useParams();
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [taux, setTaux] = useState('');

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await fetch('https://patrimoine-economique-std23044.onrender.com/possession');
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        const data = await response.json();
        const currentPossession = data.find(p => p.libelle === libelle);
        if (currentPossession) {
          setValeur(currentPossession.valeur || '');
          setDateDebut(currentPossession.dateDebut || '');
          setDateFin(currentPossession.dateFin || '');
          setTaux(currentPossession.taux || '');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des possessions:', error);
      }
    };

    fetchPossessions();
  }, [libelle]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://patrimoine-economique-std23044.onrender.com/possession/${libelle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valeur, dateDebut, dateFin, taux }),
      });
      if (!response.ok) {
        throw new Error('Ne reponds pas');
      }
      const updatedPossession = await response.json();
      alert('Possession mise à jour:', updatedPossession);
      window.location.href = '/possession';
    } catch (error) {
      alert('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className="update-possession-page">
      <h2>Mettre à jour la possession: {libelle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Valeur:</label>
          <input
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Date de début:</label>
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Date de fin:</label>
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Taux:</label>
          <input
            type="number"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
            className="form-control"
          />
        </div>
        <Button variant="primary" type="submit">Mettre à jour</Button>
      </form>
    </div>
  );
}
