import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function CreatePossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState(new Date());
    const [amortissement, setAmortissement] = useState('');
    const navigate = useNavigate();

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!libelle || !valeur || !dateDebut) {
            console.error('Libelle, Valeur, and Debut are required');
            return;
        }

        const data = {
            possesseur: { nom: "John Doe" },
            libelle,
            valeur,
            dateDebut: formatDate(dateDebut),
            dateFin: null,
            tauxAmortissement: amortissement || 0
        };

        try {
            const response = await axios.post('https://backend-patrimoine-economique-c484.onrender.com/possession', data);
            console.log('Possession created successfully:', response.data);
            navigate('/possessions');
        } catch (error) {
            console.error('An error occurred during the request.', error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="libelle" className="form-label">Libelle</label>
                    <input
                        type="text"
                        id="libelle"
                        className="form-control"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="valeur" className="form-label">Valeur</label>
                    <input
                        type="number"
                        id="valeur"
                        className="form-control"
                        value={valeur}
                        onChange={(e) => setValeur(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateDebut" className="form-label">Debut</label>
                    <DatePicker
                        selected={dateDebut}
                        onChange={(date) => setDateDebut(date)}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amortissement" className="form-label">Amortissement</label>
                    <input
                        type="number"
                        id="amortissement"
                        className="form-control"
                        value={amortissement}
                        onChange={(e) => setAmortissement(e.target.value)}
                    // Make this field optional or set default
                    />
                </div>
                <button type="submit" className="btn btn-primary">Confirm</button>
            </form>
        </div>
    );
}

export default CreatePossession;
