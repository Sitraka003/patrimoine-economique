import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function ListPossessionPage() {
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        const fetchPossessions = async () => {
            try {
                const response = await fetch('http://localhost:9000/possession');
                if (!response.ok) {
                    throw new Error('response was not ok');
                }
                const data = await response.json();
                setPossessions(data);
            } catch (error) {
                console.error('Error fetching possessions:', error);
            }
        };

        fetchPossessions();
    }, []);

    async function handleClose(libelle) {
        try {
            const response = await fetch(`http://localhost:9000/possession/${libelle}/close`, {
              method: 'POST',
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Retirer la possession clôturée de la liste
            setPossessions((prevPossessions) =>
              prevPossessions.filter((p) => p.libelle !== libelle)
            );
            alert('Possession clôturée');
          } catch (error) {
            console.error('Erreur lors de la clôture de la possession:', error);
            alert('Erreur lors de la clôture de la possession');
          }
    }

    return (
        <div className="list-possession-page">
            <h2>Liste des Possessions</h2>
            <Link to="/possession/create">
                <Button variant="success">Créer une nouvelle possession</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th>Libelle</th>
                        <th>Valeur</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Taux</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.map((possession, index) => (
                        <tr key={index} className='text-center'>
                            <td>{index + 1}</td>
                            <td>{possession.libelle}</td>
                            <td>{possession.valeur}</td>
                            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                            <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : '-'}</td>
                            <td>{possession.taux}</td>
                            <td>
                                <Link to={`/possession/${possession.libelle}/update`}>
                                    <Button variant="warning">Editer</Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    onClick={() => handleClose(possession.libelle)}
                                >
                                    Cloturer
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
