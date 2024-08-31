import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "white",
      bodyColor: "white",
    },
  },
  hover: {
    mode: "nearest",
    intersect: true,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Libellés",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Valeur",
      },
      beginAtZero: true,
    },
  },
  animation: {
    duration: 1000,
    easing: "easeInOutQuad",
  },
};
const LineChart = ({ data, options = {}, styles = {} }) => {
  const prepareLineChartData = () => {
    return {
      labels: data.map((item) => item.libelle),
      datasets: [
        {
          label: "Valeur Actuelle",
          data: data.map((item) => item.valeur),
          borderColor: styles.borderColor || "#4e73df",
          backgroundColor: styles.backgroundColor || "rgba(78, 115, 223, 0.2)",
          borderWidth: styles.borderWidth || 1,
          fill: styles.fill || true,
        },
      ],
    };
  };

  return (
    <div className="chart-container">
      <h2 className="text-center">Graphique des Possessions (Lignes)</h2>
      {data.length > 0 ? (
        <Line data={prepareLineChartData()} options={options} />
      ) : (
        <p className="text-center">
          Aucune donnée disponible pour afficher le graphique!
        </p>
      )}
    </div>
  );
};


export default LineChart;
