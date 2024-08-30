import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import PossessionForm from './PossessionForm';
import PossessionsItem from './PossessionsItem';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './navbar';
import './css/style.css';



export default function ListPossession() {

    const [possessions, setPossessions] = useState([]);
    const [editingPossession, setEditingPossession] = useState(null)
    const [date1, setDate1] = useState();
    const [date2, setDate2] = useState();
    const [showChart, setShowChart] = useState(false);
    const [showModal, setShowModal] = useState(false);



    const toggleModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowChart(true); // Only show the chart after the button is clicked
    };

    const fetchPossessions = async () => {
        const response = await fetch('http://localhost:3000/api/possessions');
        const possessions = await response.json();
        console.log(possessions);
        setPossessions(possessions);
    };

    useEffect(() => {
        fetchPossessions();
    }, []);

    const deletePossession = async (id) => {
        await fetch(`http://localhost:3000/api/possessions/${id}`, {
            method: 'DELETE',
        });
        fetchPossessions();  // Refresh the list after deletion
    };

    const editPossession = (possession) => {
        setShowModal(true);
        setEditingPossession(possession);
    };




    return (
        <>
            <Navbar />
            <Table striped bordered hover className="w-53 border border-white mt-5">
                <thead className='bg-primary'>
                    <tr>
                        <th className='bg-primary'>Libelle</th>
                        <th className='bg-primary'>Valeur</th>
                        <th className='bg-primary'>Date de Début</th>
                        <th className='bg-primary'>Date de Fin</th>
                        <th className='bg-primary'>Taux D'Amortissement</th>
                        <th className='bg-primary'>Status</th>
                        <th className='bg-primary'>Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.map(possession => (
                        <PossessionsItem key={possession.id} possession={possession} onDelete={deletePossession} onEdit={editPossession} />
                    ))}
                </tbody>
            </Table>
            <Button className='button mt-3' onClick={() => { setShowModal(true); setEditingPossession(null) }} >Ajout de Possession</Button>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <PossessionForm onSubmit={fetchPossessions} editingPossession={editingPossession} onClose={toggleModal} />
                    </div>
                </div>
            )}
        </>
    );

}
