import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { format, differenceInDays, addDays } from 'date-fns';
import React, { useState, useEffect } from 'react';

const generateDateLabels = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalDays = differenceInDays(end, start);
  const interval = totalDays / 4; // 4 segments for 5 dates

  const dates = [];

  for (let i = 0; i < 5; i++) {
    const currentDate = addDays(start, Math.round(i * interval));
    dates.push(format(currentDate, 'yyyy-MM-dd'));
  }

  return dates;
};


 const LineChart = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const labels = generateDateLabels(startDate, endDate);

    // Send labels to the backend and get the respective values using fetch
    fetch('http://localhost:3000/api/getValeur', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  dates:labels }),
    })
    .then(response => response.json())
    .then(data => {
      const values = data.values; // Assuming the API returns an array of values
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Possessions Values',
            data: values,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.1,
          },
        ],
      });
    })
    .catch(error => {
      console.error('Error fetching values:', error);
    });
  }, [startDate, endDate]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Possessions Values Over Time',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Dates',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Possessions Values',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '50%', height: '500px', margin: '0 auto' }}>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};


export default LineChart;
