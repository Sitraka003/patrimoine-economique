// src/components/ChartComponent.js

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

const ChartComponent = ({ chartData }) => {
  return (
    <div className="mt-5 bg-white p-5 m-5 rounded-3">
      <h2 className="text-center mb-4">
        Graphique des Valeurs des Possessions
      </h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
