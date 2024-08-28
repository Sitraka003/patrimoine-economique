import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const DistributionChart = () => {
  const data = {
    labels: ["Actifs", "Passifs", "Épargne", "Investissements"],
    datasets: [
      {
        data: [400, 300, 300, 200],
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-4">
      <div style={{ width: "400px", height: "400px" }}>
        <Pie data={data} options={options} />
      </div>
      <div>
        <img
          src="https://previews.123rf.com/images/stuartphoto/stuartphoto1607/stuartphoto160700417/61228203-statistics-charts-meaning-stats-statistical-and-diagram.jpg"
          alt="Description de l'image"
          style={{ width: "250px", height: "200px" }}
        />
      </div>
    </div>
  );
};

export default DistributionChart;
