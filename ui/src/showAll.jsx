import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Show = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/persons");
                setPersons(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des personnes", error);
            }
        };
        fetchPersons();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center text-primary">Liste des Personnes et leurs Possessions</h1>
            {persons.map((person, index) => (
                <div key={index} className="mb-4">
                    <h3>{person.nom}</h3>
                    <table className="table table-striped table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Type</th>
                                <th>Libellé</th>
                                <th>Valeur</th>
                                <th>Date de Début</th>
                                <th>Date de Fin</th>
                                <th>Taux d'Amortissement</th>
                                <th>Valeur Constante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {person.possessions.map((possession, index) => (
                                <tr key={index}>
                                    <td>{possession.type}</td>
                                    <td>{possession.libelle}</td>
                                    <td>{possession.valeur} Ar</td>
                                    <td>{possession.dateDebut}</td>
                                    <td>{possession.dateFin ? possession.dateFin : "N/A"}</td>
                                    <td>
                                        {possession.tauxAmortissement !== null
                                            ? `${possession.tauxAmortissement} %`
                                            : "N/A"}
                                    </td>
                                    <td>
                                        {possession.valeurConstante !== null
                                            ? `${possession.valeurConstante} Ar`
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Show;
