import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function ListPossessionPage() {
    const [possessions, setPossessions] = useState([]);
    const [error, setError] = useState(null); // State to track errors

    useEffect(() => {
        const fetchPossessions = async () => {
            try {
                const response = await fetch('https://patrimoine-economique-mybackend-std23044.onrender.com/possession');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPossessions(data);
            } catch (error) {
                console.error('Error fetching possessions:', error);
                setError(error.message); // Set error message for display
            }
        };

        fetchPossessions();
    }, []);

    async function handleClose(libelle) {
        try {
            const response = await fetch(`https://patrimoine-economique-mybackend-std23044.onrender.com/possession/${libelle}/close`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setPossessions((prevPossessions) =>
                prevPossessions.map((p) =>
                    p.libelle === libelle ? { ...p, dateFin: new Date(result.possession.dateFin).toLocaleDateString() } : p
                )
            );
        } catch (error) {
            console.error('Error closing possession:', error);
            alert('Error closing possession');
        }
    }

    async function handleDelete(libelle) {
        try {
            const response = await fetch(`https://patrimoine-economique-mybackend-std23044.onrender.com/possession/${libelle}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setPossessions((prevPossessions) =>
                prevPossessions.filter(p => p.libelle !== libelle)
            );
            alert('Possession deleted');
        } catch (error) {
            console.error('Error deleting possession:', error);
            alert('Error deleting possession');
        }
    }

    return (
        <div className="list-possession-page">
            <h2>Liste des Possessions</h2>
            {error && <div className="error">Error: {error}</div>}
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
                        <th>Valeur Actuelle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.length > 0 ? (
                        possessions.map((possession, index) => (
                            <tr key={index} className='text-center'>
                                <td>{index + 1}</td>
                                <td>{possession.libelle}</td>
                                <td>{possession.valeur}</td>
                                <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                                <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : '-'}</td>
                                <td>{possession.taux !== null ? possession.taux : '0'}</td>
                                <td>{possession.valeurActuelle}</td>
                                <td>
                                    <Link to={`/possession/${possession.libelle}/update`}>
                                        <Button variant="primary">Editer</Button>
                                    </Link>
                                    <Button
                                        variant="warning"
                                        onClick={() => handleClose(possession.libelle)}
                                    >
                                        Cloturer
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(possession.libelle)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className='text-center'>No possessions available</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
