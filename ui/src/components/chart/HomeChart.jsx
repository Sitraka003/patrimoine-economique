import React from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";

const HomeChart = () => {
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Évolution du Patrimoine",
        data: [30000, 45000, 40000, 60000, 75000, 85000],
        fill: false,
        borderColor: "#4A90E2",
        tension: 0.4,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#4A90E2",
        pointBorderWidth: 3,
        pointHoverBackgroundColor: "#4A90E2",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#E3E3E3",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-5 bg-white m-1"
    >
      <Line data={data} options={options} />
    </motion.div>
  );
};

export default HomeChart;
