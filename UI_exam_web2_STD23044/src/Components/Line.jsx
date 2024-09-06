import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineGraph() {
    const [dateDebut, setDateDebut] = useState();
    const [dateFin, setDateFin] = useState();
    const [jour, setJour] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleFetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:9000/patrimoine/range', {
                dateDebut: dateDebut?.toISOString().split('T')[0],
                dateFin: dateFin?.toISOString().split('T')[0],
                type: 'month',
                jour
            });
            const dates = response.data.map(item => item.date);
            const valeurs = response.data.map(item => item.valeur);

            setData({
                labels: dates,
                datasets: [{
                    label: 'Evolution',
                    borderColor: '#ffd700',
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    data: valeurs,
                    fill: true
                }]
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        } finally {
            setLoading(false);
        }
    };

    const defaultData = {
        labels: ['No data'],
        datasets: [{
            label: 'Default Data',
            borderColor: '#ddd',
            backgroundColor: 'rgba(221, 221, 221, 0.5)',
            data: [0],
            fill: true
        }]
    };

    return (
        <div>
            <h2>Patrimoine Line Chart</h2>
            <div>
                <label>Date Debut:</label>
                <DatePicker
                    selected={dateDebut}
                    onChange={(date) => setDateDebut(date)}
                    dateFormat="dd/MM/yyyy"
                />
            </div>
            <div>
                <label>Date Fin:</label>
                <DatePicker
                    selected={dateFin}
                    onChange={(date) => setDateFin(date)}
                    dateFormat="dd/MM/yyyy"
                />
            </div>
            <div>
                <label>Jour:</label>
                <select value={jour} onChange={(e) => setJour(Number(e.target.value))}>
                    {[1, 7, 30].map(day => (
                        <option key={day} value={day}>{day} days</option>
                    ))}
                </select>
            </div>
            <button onClick={handleFetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Validate'}
            </button>
            <div>
                <Line
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return `Valeur: ${tooltipItem.raw.toFixed(2)}`;
                                    }
                                }
                            }
                        }
                    }}
                    data={data.labels ? data : defaultData}
                />
            </div>
        </div>
    );
}
