import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function CreatePossessionPage() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('https://patrimoine-economique-std23044.onrender.com/possession', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ libelle, valeur, dateDebut, taux }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newPossession = await response.json();
            alert('Nouvelle possession créée:', newPossession);
            window.location.href = '/possession';
        } catch (error) {
            alert('Erreur dans la création de la possession:', error);
        }
    };

    return (
        <div className="create-possession-page">
            <h2>Créer une nouvelle Possession</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Libelle:</label>
                    <input
                        type="text"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Valeur:</label>
                    <input
                        type="number"
                        value={valeur}
                        onChange={(e) => setValeur(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de début:</label>
                    <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Taux:</label>
                    <input
                        type="number"
                        value={taux}
                        onChange={(e) => setTaux(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <Button variant="primary" type="submit">Créer</Button>
            </form>
        </div>
    );
}
