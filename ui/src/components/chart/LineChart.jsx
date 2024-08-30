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

const LineChart = ({ data }) => {
  console.log("Data passed to LineChart:", data); // Vérifiez le type de data ici

  const prepareLineChartData = () => {
    return {
      labels: data.map((item) => item.libelle),
      datasets: [
        {
          label: "Valeur Actuelle",
          data: data.map((item) => item.valeur),
          borderColor: "#4e73df",
          backgroundColor: "rgba(78, 115, 223, 0.2)",
          borderWidth: 1,
          fill: true,
        },
      ],
    };
  };

  return (
    <div className="chart-container">
      <h2 className="text-center">Graphique des Possessions (Lignes)</h2>
      <Line data={prepareLineChartData()} />
    </div>
  );
};


export default LineChart;
