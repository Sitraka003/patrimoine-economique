import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

function UpdatePossession() {
    const { libelle } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [newLibelle, setNewLibelle] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/possession/${libelle}`);
                setNewLibelle(response.data.libelle || '');
                if (response.data.Fin) {
                    setStartDate(new Date(response.data.Fin));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching possession:', error);
                setLoading(false);
            }
        };

        fetchPossession();
    }, [libelle]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            await axios.put(`http://localhost:3000/possession/${libelle}`, {
                dateFin: startDate.toISOString().split('T')[0],
                newLibelle
            });
            navigate('/possessions');
        } catch (error) {
            console.error('Error updating possession:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='m-5'>
            <Form onSubmit={handleSubmit}>
                <h1 className='m-5'>UPDATE POSSESSION</h1>
                <Form.Group as={Row} className="mb-3" controlId="formLibelle">
                    <Form.Label column sm="2">
                        Libelle:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={newLibelle}
                            onChange={(e) => setNewLibelle(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formDateFin">
                    <Form.Label column sm="2">
                        Date Fin:
                    </Form.Label>
                    <Col sm="10">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy/MM/dd"
                            className="form-control"
                            required
                        />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </div>
    );
}

export default UpdatePossession;