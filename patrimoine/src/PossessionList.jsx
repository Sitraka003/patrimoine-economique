import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PossessionList = () => {
  const [possessions, setPossessions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPossession, setNewPossession] = useState({
    libelle: '',
    valeur: 0,
    dateDebut: new Date(),
    tauxAmortissement: 0,
  });

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await fetch('/api/possession');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data retrieved:', data); // Vérifiez les données récupérées
        setPossessions(data);
      } catch (error) {
        console.error('Error fetching possessions:', error);
      }
    };

    fetchPossessions();
  }, []);

  const handleCreatePossession = async () => {
    try {
      const response = await fetch('/api/possession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPossession),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const createdPossession = await response.json();
      setPossessions([...possessions, createdPossession]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating possession:', error);
    }
  };

  const handleDeletePossession = async (id) => {
    try {
      const response = await fetch(`/api/possession/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setPossessions(possessions.filter(possession => possession.id !== id));
    } catch (error) {
      console.error('Error deleting possession:', error);
    }
  };

  return (
    <div>
      <h1>Liste des Possessions</h1>

      <Button onClick={() => setShowCreateForm(true)} className="mb-3">
        Créer une Possession
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.length > 0 ? (
            possessions.map((possession) => (
              <tr key={possession.id}>
                <td>{possession.libelle || 'N/A'}</td>
                <td>{possession.valeur || 'N/A'}</td>
                <td>{possession.dateDebut ? new Date(possession.dateDebut).toLocaleDateString() : 'N/A'}</td>
                <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
                <td>{possession.tauxAmortissement || 'N/A'}</td>
                <td>{/* Ajouter la logique pour calculer la valeur actuelle si nécessaire */}</td>
                <td>
                  <Button variant="warning" onClick={() => { /* Logique pour mettre à jour la possession ici */ }}>Mettre à jour</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeletePossession(possession.id)}>Supprimer</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Aucune possession trouvée</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Formulaire de création de Possession */}
      <Modal show={showCreateForm} onHide={() => setShowCreateForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une Nouvelle Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="libelle">
              <Form.Label>Libellé</Form.Label>
              <Form.Control
                type="text"
                value={newPossession.libelle}
                onChange={(e) => setNewPossession({ ...newPossession, libelle: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="valeur">
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type="number"
                value={newPossession.valeur}
                onChange={(e) => setNewPossession({ ...newPossession, valeur: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="dateDebut">
              <Form.Label>Date de Début</Form.Label>
              <DatePicker
                selected={newPossession.dateDebut}
                onChange={(newDate) => setNewPossession({ ...newPossession, dateDebut: newDate })}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>
            <Form.Group controlId="tauxAmortissement">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="number"
                value={newPossession.tauxAmortissement}
                onChange={(e) => setNewPossession({ ...newPossession, tauxAmortissement: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateForm(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleCreatePossession}>
            Créer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PossessionList;
