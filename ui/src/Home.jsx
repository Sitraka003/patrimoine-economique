import React from "react";
import DistributionChart from "./DistributionChart";

const Home = () => {
  return (
    <div className="container mt-5 bg-dark text-light">
      <h1 className="text-3xl font-bold text-center text-primary">
        Patrimoine Calculator App
      </h1>
      <DistributionChart />
    </div>
  );
};

export default Home;
