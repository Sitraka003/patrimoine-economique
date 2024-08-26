import './App.css'
import React from 'react';
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
//import Line from "react-chartjs-2"
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Nav variant="tabs" defaultActiveKey="/home" className="d-flex justify-content-around" style={{ width: '90vw' }}>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Patrimoine</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Possessions</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

function MyChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    // Create a new chart instance
    chartInstance.current = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: ['Jan', 'Feb', 'March', 'Apr', 'May'],
        datasets: [
          {
            label: "Patrimoine economique",
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
    <div>
      <canvas ref={chartRef} style={{ width: "400px", height: "200px" }} />
    </div>
  );
}

function App() {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <tbody>
        <MyChart/>
      </tbody>
    </div>
  );
}

export default App;

