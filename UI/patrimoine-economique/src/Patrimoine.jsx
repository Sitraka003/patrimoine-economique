import { Chart } from 'chart.js/auto';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function MyChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ['Jan', 'Feb', 'March', 'Apr', 'May'],
                datasets: [
                    {
                        label: "Votre patrimoine economique",
                        data: [65, 34, 65, 34, 56],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2,
                    },
                ],
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={0

                }>
                    <canvas
                        ref={chartRef}
                        style={{ width: "100%", height: "100px" }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

function Choices() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <Container className="my-4">
            <Form>
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

                <Form.Group as={Row} className="mb-3" controlId="formDate">
                    <Form.Label column sm="2">
                        Date Fin:
                    </Form.Label>
                    <Col sm="5">
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="form-control"
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select a date"
                        />
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
        </Container>
    );
}

function GetValeurPatrimoine() {
    const [endDate, setEndDate] = useState(new Date());

    return (
        <Form lassName="my-4">
            <Form.Group as={Row} className="mb-3" controlId="formDate">
                <Form.Label column sm="2">
                    Pick a date:
                </Form.Label>
                <Col sm="5">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control"
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a date"
                    />
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
    );
}
function Patrimoine() {
    return (
        <div>
            <Choices />
            <MyChart />
            <GetValeurPatrimoine/>
        </div>
    );
}

export default Patrimoine;