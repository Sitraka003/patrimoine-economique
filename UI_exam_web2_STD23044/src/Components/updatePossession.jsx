import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function UpdatePossessionPage() {
  const { libelle } = useParams();
  const [currentLibelle, setCurrentLibelle] = useState(libelle);
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [taux, setTaux] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await fetch('https://patrimoine-economique-mybackend-std23044.onrender.com/possession');
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        const data = await response.json();
        const currentPossession = data.find(p => p.libelle === libelle);
        if (currentPossession) {
          setCurrentLibelle(currentPossession.libelle || libelle);
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
      const updateResponse = await fetch(`https://patrimoine-economique-mybackend-std23044.onrender.com/possession/${libelle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ libelle: currentLibelle, valeur, dateDebut, dateFin, taux }),
      });

      if (!updateResponse.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }
      const updatedPossession = await updateResponse.json();

      if (libelle !== currentLibelle) {
        const deleteResponse = await fetch(`https://patrimoine-economique-mybackend-std23044.onrender.com/possession/${libelle}`, {
          method: 'DELETE',
        });

        if (!deleteResponse.ok) {
          throw new Error('Erreur lors de la suppression de l\'ancienne possession');
        }

        const createResponse = await fetch(`https://patrimoine-economique-mybackend-std23044.onrender.com/possession`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ libelle: currentLibelle, valeur, dateDebut, dateFin, taux }),
        });

        if (!createResponse.ok) {
          throw new Error('Erreur lors de la création de la nouvelle possession');
        }
      }

      alert('Possession mise à jour !');
      navigate('/possession');
    } catch (error) {
      alert('Erreur lors de la mise à jour: ' + error.message);
    }
  }

  return (
    <div className="update-possession-page">
      <h2>Mettre à jour la possession</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Libelle:</label>
          <input
            type="text"
            value={currentLibelle}
            onChange={(e) => setCurrentLibelle(e.target.value)}
            className="form-control"
          />
        </div>
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
