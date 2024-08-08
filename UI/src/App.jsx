import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Possession from '../../models/possessions/Possession';
export default function App() {
    // Créez des instances de Possession
    const possessions = [
        new Possession('John Doe', 'Ordinateur', 1000, new Date('2022-01-01'), new Date('2025-01-01'), 10),
        new Possession('Jane Smith', 'Voiture', 20000, new Date('2020-06-15'), new Date('2024-06-15'), 5),
        // Ajoutez d'autres possessions ici
    ];

    const [dateActuelle] = useState(new Date()); // Vous pouvez remplacer par une date dynamique si besoin

    return (
        <div className="container border border-2 border-primary px-100">
            <table className="table table-secondary">
                <thead>
                    <tr>
                        <th scope="col">Libellé</th>
                        <th scope="col">Valeur initiale</th>
                        <th scope="col">Date début</th>
                        <th scope="col">Date fin</th>
                        <th scope="col">Amortissement</th>
                        <th scope="col">Valeur actuelle</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.map((possession, index) => (
                        <tr key={index}>
                            <td>{possession.libelle}</td>
                            <td>{possession.valeur}</td>
                            <td>{possession.dateDebut.toLocaleDateString()}</td>
                            <td>{possession.dateFin.toLocaleDateString()}</td>
                            <td>{possession.tauxAmortissement}%</td>
                            <td>{possession.getValeur(dateActuelle)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
