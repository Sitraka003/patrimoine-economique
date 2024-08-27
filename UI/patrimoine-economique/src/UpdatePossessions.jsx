import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

function UpdatePossession() {
    const { libelle } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [possessions, setPossessions] = useState(null);

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await axios.get(`/possession/${libelle}`);
                setPossessions(response.data);
            } catch (error) {
                console.error('Error fetching possession:', error);
            }
        };

        fetchPossession();
    }, [libelle]);

    return (
        <div className='m-5'>
            <Form>
                <h1 className='m-5'>UPDATE POSSESSION</h1>
                <Form.Group as={Row} className="mb-3" controlId="formLibelle">
                    <Form.Label column sm="2">
                        Libelle:
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" placeholder={possessions?.libelle || "Libelle"} />
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
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select a date"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 5, offset: 2 }}>
                        <Button variant="primary" type="submit">
                            Edit Possession
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default UpdatePossession;
