import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyChart({ labels, data }) {
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
                labels: labels,
                datasets: [
                    {
                        label: "Votre patrimoine économique",
                        data: data,
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
    }, [labels, data]);

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={12}>
                    <canvas
                        ref={chartRef}
                        style={{ width: "100%", height: "100px" }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

function Choices({ startDate, setStartDate, endDate, setEndDate, onConfirm }) {
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
                            dateFormat="yyyy-MM-dd"
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
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 5, offset: 2 }}>
                        <Button variant="primary" type="button" onClick={onConfirm}>
                            Confirm
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

function GetValeurPatrimoine({ startDate, endDate }) {
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        const fetchPossessionsAndCalculatePatrimoine = async () => {
            try {
                const response = await axios.get('https://backend-patrimoine-economique-c484.onrender.com/possessions');
                const possessions = response.data;

                const labels = [];
                const data = [];
                let currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                    const formattedDate = currentDate.toISOString().split('T')[0];
                    labels.push(formattedDate);

                    const totalPatrimoine = possessions.reduce((total, possession) => {
                        const { valeur, tauxAmortissement, dateDebut } = possession;
                        const possessionStartDate = new Date(dateDebut);
                        if (possessionStartDate <= currentDate) {
                            const depreciationRate = tauxAmortissement / 100;
                            const ageInYears = (currentDate - possessionStartDate) / (1000 * 60 * 60 * 24 * 365.25);
                            return total + valeur * Math.pow(1 - depreciationRate, ageInYears);
                        }
                        return total;
                    }, 0);

                    data.push(totalPatrimoine.toFixed(2));

                    currentDate.setMonth(currentDate.getMonth() + 1);
                }

                setChartData({ labels, data });
            } catch (error) {
                console.error('Error fetching possessions:', error);
            }
        };

        fetchPossessionsAndCalculatePatrimoine();
    }, [startDate, endDate]);

    return (
        <MyChart labels={chartData.labels} data={chartData.data} />
    );
}

function PatrimoineOnTheActualDay({ onCalculatePatrimoine }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(null);

    const handleConfirm = async () => {
        try {
            const response = await axios.get('https://backend-patrimoine-economique-c484.onrender.com/possessions');
            const possessions = response.data;

            const totalPatrimoine = possessions.reduce((total, possession) => {
                const { valeur, tauxAmortissement, dateDebut } = possession;
                const depreciationRate = tauxAmortissement / 100;
                const possessionStartDate = new Date(dateDebut);
                const ageInYears = (selectedDate - possessionStartDate) / (1000 * 60 * 60 * 24 * 365.25);

                return total + valeur * Math.pow(1 - depreciationRate, ageInYears);
            }, 0);


            setPatrimoineValue(totalPatrimoine.toFixed(2));

        } catch (error) {
            console.error('Error calculating patrimoine:', error);
            setPatrimoineValue('Error calculating patrimoine');
        }
    };

    return (
        <Container className="my-4">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formDate">
                    <Form.Label column sm="2">
                        Choisissez une date :
                    </Form.Label>
                    <Col sm="5">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 5, offset: 2 }}>
                        <Button variant="primary" type="button" onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

            {patrimoineValue !== null && (
                <Row className="mt-3">
                    <Col sm={{ span: 5, offset: 2 }}>
                        <Alert variant="info">
                            <strong>Patrimoine Value: </strong> {patrimoineValue} Ariary
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

function Patrimoine() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(null);

    const handleConfirm = () => {
        // Just trigger a re-render of the chart with new dates
    };

    return (
        <div>
            <Choices startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} onConfirm={handleConfirm} />
            <GetValeurPatrimoine startDate={startDate} endDate={endDate} />
            <PatrimoineOnTheActualDay />
        </div>
    );
}


export default Patrimoine;
