import React, { useState, useEffect, useImperativeHandle } from 'react';
import Button from 'react-bootstrap/Button';
import './css/style.css'

export default function PossessionForm({ onSubmit, editingPossession, onClose}) {
  const [formType, setFormType] = useState("");
  const [libelle, setLibelle] = useState("");
  const [valeur, setValeur] = useState(0);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState(null);
  const [tauxAmortissement, setTauxAmortissement] = useState(0);
  const [jour, setJour] = useState(0);


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont basés sur 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  useEffect(() => {
    if (editingPossession) {
      setLibelle(editingPossession.libelle);
      setValeur(editingPossession.valeur);
      setDateDebut(formatDate(editingPossession.dateDebut));
      setDateFin(formatDate(editingPossession.dateFin));
      setTauxAmortissement(editingPossession.tauxAmortissement);
      if (editingPossession.jour) {
        setJour(editingPossession.jour)
        setFormType("flux")
      } else {
        setFormType("bienMateriel")
      }
    }
  }, [editingPossession]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === "bienMateriel") {
      const method = editingPossession ? 'PUT' : 'POST';
      const url = editingPossession
        ? `http://localhost:3000/api/BienMateriel/${editingPossession.id}`
        : 'http://localhost:3000/api/BienMateriel';

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ libelle, valeur, dateDebut, dateFin, tauxAmortissement }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        onSubmit(); // Notify parent to refresh list
        setLibelle("");
        setValeur(0);
        setDateDebut();
        setDateFin(null);
        setTauxAmortissement(0);
        setFormType("");
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }

    if (formType === "flux") {
      const method = editingPossession ? 'PUT' : 'POST';
      const url = editingPossession
        ? `http://localhost:3000/api/Flux/${editingPossession.id}`
        : 'http://localhost:3000/api/Flux';

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        onSubmit(); // Notify parent to refresh list
        setLibelle("");
        setValeur(0);
        setDateDebut("");
        setDateFin(null);
        setTauxAmortissement(0)
        setJour(0)
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  };


  return (
    <div className='form'>
      {formType === "" && (
        <div className='f2'>
          <Button onClick={() => setFormType("bienMateriel")}>Bien Matériel</Button>
          <Button onClick={() => setFormType("flux")}>Flux</Button>
          <Button onClick={() => onClose()}>Close</Button>
        </div>
      )}

      {formType === "bienMateriel" && (
        <form onSubmit={handleSubmit} className='f1'>
          <div>
            <label>Libellé:</label>
            <input
              type="text"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Valeur:</label>
            <input
              type="number"
              value={valeur}
              onChange={(e) => setValeur(parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Date de Début:</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date de Fin:</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
          <div>
            <label>Taux d'Amortissement:</label>
            <input
              type="number"
              value={tauxAmortissement}
              onChange={(e) => setTauxAmortissement(parseFloat(e.target.value))}
              required
            />
          </div>
          <Button className='mt-3' type="submit">{editingPossession ? 'Save Changes' : 'Add Possession'}</Button>
        </form>
      )}

      {formType === "flux" && (
        <form onSubmit={handleSubmit} className='f1'>
          <div>
            <label>Libellé:</label>
            <input
              type="text"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Valeur:</label>
            <input
              type="number"
              value={valeur}
              onChange={(e) => setValeur(parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Date de Début:</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date de Fin:</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}

            />
          </div>
          <div>
            <label>Taux d'Amortissement:</label>
            <input
              type="number"
              value={tauxAmortissement}
              onChange={(e) => setTauxAmortissement(parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Jour:</label>
            <input
              type="number"
              value={jour}
              onChange={(e) => setJour(parseInt(e.target.value, 10))}
              required
            />
          </div>
          <Button className='mt-3 ms-2' type="submit">{editingPossession ? 'Save Changes' : 'Add Possession'}</Button>
        </form>
      )}
      {formType === "" ? <></> : <Button className='mt-4 ms-5 mx-5' onClick={() => setFormType("")}>Annuler</Button>}
    </div>
  );
}

