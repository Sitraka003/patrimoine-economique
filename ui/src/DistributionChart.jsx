import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const DistributionChart = () => {
  const data = {
    labels: ["Actifs", "Passifs", "Épargne", "Investissements"],
    datasets: [
      {
        data: [400, 300, 300, 200],
        backgroundColor: ["#48BB78", "#F6E05E", "#F56565", "#B83280"], // Updated colors for dark mode
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-4 bg-dark text-light">
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
