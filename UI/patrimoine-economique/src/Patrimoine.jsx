import { Chart } from 'chart.js/auto';
import React from 'react';
import { useEffect, useRef } from 'react';

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

export default MyChart;