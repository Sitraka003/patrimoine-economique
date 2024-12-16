import React from "react";
import { FaChartLine, FaPiggyBank, FaHandsHelping } from "react-icons/fa";

const Features = () => {
  return (
    <div className=" mt-5">
      <div className="row text-center">
        <div className="col-md-4">
          <FaChartLine size={50} className="mb-3 text-primary" />
          <h4>Suivi de l'Évolution</h4>
          <p>Suivez en temps réel l'évolution de votre patrimoine.</p>
        </div>
        <div className="col-md-4">
          <FaPiggyBank size={50} className="mb-3 text-primary" />
          <h4>Optimisation de l'Épargne</h4>
          <p>Optimisez votre épargne grâce à nos outils.</p>
        </div>
        <div className="col-md-4">
          <FaHandsHelping size={50} className="mb-3 text-primary" />
          <h4>Conseils Personnalisés</h4>
          <p>
            Bénéficiez de conseils personnalisés pour mieux gérer votre
            patrimoine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
