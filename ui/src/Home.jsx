import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 bg-dark text-light p-5 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-gradient">
        Patrimoine Calculator App
      </h1>
      <p className="text-center text-lg mb-8">
        Gérez et analysez votre patrimoine personnel avec facilité. Utilisez nos
        outils pour suivre vos actifs, passifs, épargne et investissements.
      </p>
      <div className="text-center">
        <button className="btn btn-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <Link className="nav-link" to="/show">
            View
          </Link>
        </button>
      </div>

      <p class="position-absolute bottom-0 end-0 mb-3 me-3 text-light">
        By Ranto
      </p>
    </div>
  );
};

export default Home;
