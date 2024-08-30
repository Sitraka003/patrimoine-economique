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
    const [currentLibelle, setCurrentLibelle] = useState('');
    const [newLibelle, setNewLibelle] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await axios.get(`/possession/${libelle}`);
                setCurrentLibelle(response.data.libelle || '');
                setNewLibelle(response.data.libelle || '');

                if (response.data.dateFin) {
                    setStartDate(new Date(response.data.dateFin));
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
            const url = `/possession/${currentLibelle}`;
            console.log(`Updating possession at URL: ${url}`);
            console.log('Payload:', {
                dateFin: startDate.toISOString().split('T')[0],
                libelle: newLibelle
            });

            await axios.put(url, {
                dateFin: startDate.toISOString().split('T')[0],
                libelle: newLibelle
            });
            navigate('/possession');
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
                    <Col sm="5">
                        <Form.Control
                            type="text"
                            value={newLibelle || ''}
                            onChange={(e) => setNewLibelle(e.target.value)}
                            placeholder={currentLibelle}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDate">
                    <Form.Label column sm="2">
                        Date Fin:
                    </Form.Label>
                    <Col sm="5">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 5, offset: 2 }}>
                        <Button variant="primary" type="submit" disabled={submitting}>
                            {submitting ? 'Updating...' : 'Edit Possession'}
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default UpdatePossession;