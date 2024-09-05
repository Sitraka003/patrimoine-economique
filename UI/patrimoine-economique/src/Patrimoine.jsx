import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
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

function Choices({ startDate, setStartDate, endDate, setEndDate }) {
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
                        <Button variant="primary" type="submit">
                            Confirm
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

function GetValeurPatrimoine({ startDate, endDate, onChartUpdate }) {
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        const fetchPossessionsAndCalculatePatrimoine = async () => {
            try {
                const response = await axios.get('http://localhost:3000/possessions');
                const possessions = response.data;

                const labels = [];
                const data = [];
                let endDateLocal = new Date(endDate);

                let currentDate = new Date(startDate);

                // Calculate patrimoine data
                while (currentDate <= endDateLocal) {
                    const formattedDate = currentDate.toISOString().split('T')[0];

                    // Calculate the total patrimoine for the current month
                    const totalPatrimoine = possessions.reduce((total, possession) => {
                        const { valeur, Amortissement, Debut } = possession;
                        const possessionStartDate = new Date(Debut);
                        if (possessionStartDate <= currentDate && possessionStartDate.getFullYear() === currentDate.getFullYear()) {
                            const depreciationRate = Amortissement / 100;
                            const ageInYears = (currentDate - possessionStartDate) / (1000 * 60 * 60 * 24 * 365.25);
                            return total + valeur * Math.pow(1 - depreciationRate, ageInYears);
                        }
                        return total;
                    }, 0);

                    labels.push(formattedDate);
                    data.push(totalPatrimoine.toFixed(2)); // Round to 2 decimal places

                    // Move to the next month
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }

                // Handle the last period
                if (endDateLocal < currentDate) {
                    const formattedDate = endDateLocal.toISOString().split('T')[0];

                    const totalPatrimoine = possessions.reduce((total, possession) => {
                        const { valeur, Amortissement, Debut } = possession;
                        const possessionStartDate = new Date(Debut);
                        if (possessionStartDate <= endDateLocal && possessionStartDate.getFullYear() === endDateLocal.getFullYear()) {
                            const depreciationRate = Amortissement / 100;
                            const ageInYears = (endDateLocal - possessionStartDate) / (1000 * 60 * 60 * 24 * 365.25);
                            return total + valeur * Math.pow(1 - depreciationRate, ageInYears);
                        }
                        return total;
                    }, 0);

                    labels.push(formattedDate);
                    data.push(totalPatrimoine.toFixed(2)); // Round to 2 decimal places
                }

                setChartData({ labels, data });
                onChartUpdate(data[data.length - 1]); // Update the patrimoine value based on chart data

            } catch (error) {
                console.error('Error fetching possessions:', error);
            }
        };

        fetchPossessionsAndCalculatePatrimoine();
    }, [startDate, endDate, onChartUpdate]);

    return (
        <MyChart labels={chartData.labels} data={chartData.data} />
    );
}

function PatrimoineOnTheActualDay({ onCalculatePatrimoine }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleConfirm = async () => {
        try {
            const response = await axios.get('http://localhost:3000/possessions');
            const possessions = response.data;

            const totalPatrimoine = possessions.reduce((total, possession) => {
                const { valeur, Amortissement, Debut } = possession;
                const depreciationRate = Amortissement / 100;
                const possessionStartDate = new Date(Debut);
                const ageInYears = (selectedDate - possessionStartDate) / (1000 * 60 * 60 * 24 * 365.25);

                return total + valeur * Math.pow(1 - depreciationRate, ageInYears);
            }, 0);

            onCalculatePatrimoine(totalPatrimoine.toFixed(2));
        } catch (error) {
            console.error('Error calculating patrimoine:', error);
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
        </Container>
    );
}

function Patrimoine() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(null);

    const handleCalculatePatrimoine = (value) => {
        setPatrimoineValue(value);
    };

    return (
        <div>
            <Choices startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            <GetValeurPatrimoine startDate={startDate} endDate={endDate} />
            <PatrimoineOnTheActualDay onCalculatePatrimoine={handleCalculatePatrimoine} />
            {patrimoineValue !== null && (
                <div className="text-center my-4">
                    <h4>{patrimoineValue} Ariary</h4>
                </div>
            )}
        </div>
    );
}

export default Patrimoine;
