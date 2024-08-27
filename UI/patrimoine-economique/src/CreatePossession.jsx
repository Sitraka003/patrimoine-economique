import React, { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

function CreatePossession() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <h1 className='m-5'>CREATE POSSESSION</h1>
            <Form className='m-5'>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Libelle:
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" placeholder="Libelle" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Valeur:
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" placeholder="Valeur" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDate">
                    <Form.Label column sm="2">
                        Date Debut:
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

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Taux d'amortissement:
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" placeholder="Taux d'amortissement" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 5, offset: 2 }}>
                        <Button variant="primary" type="submit">
                            Confirm
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>

    );
}

export default CreatePossession;
