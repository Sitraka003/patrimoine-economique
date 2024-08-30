import LineChart from "./LineChart"
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/style.css'

export default function Patrimoine() {
    const [showChart, setShowChart] = useState(false);
    const [date1, setDate1] = useState();
    const [date2, setDate2] = useState();
    const [date, setDate] = useState();
    const [valeur, setValeur] = useState(0);

    function handleSubmit(e) {
        e.preventDefault()
        setShowChart(true);
    }

    async function getValeur(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/getValeur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dates: [date] }),
        })
            .then(response => response.json())
            .then(data => {
                const values = data.values; // Assuming the API returns an array of values
                setValeur(values[0]);
            })
            .catch(error => {
                console.error('Error fetching values:', error);
            });
    }

    return (
        <>
            <Navbar />
            <form className='d-flex mt-3 w-50  justify-content-between mb-5' onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                    <label htmlFor="date1">Début</label>
                    <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} id='date1' required />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="date2">Fin</label>
                    <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} id='date2' required />
                </div>
                <Button type='submit'>Range</Button>
            </form>
            {showChart ? <LineChart startDate={date1} endDate={date2} /> : <div className="b1">Choisir les intervalles de Date</div>}
            <div className="b2">
                <form onSubmit={(e) => getValeur(e)} className="d-flex">
                    <div>
                        <label htmlFor="">Selectionner une Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <Button type='submit'>save</Button>
                </form>
                <p>Valeur du patrimoine : {valeur}</p>
            </div>
        </>
    );
}