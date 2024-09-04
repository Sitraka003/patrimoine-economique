import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomeChart from "../chart/homeChart";
import Features from "../feature/feature";
import Testimonials from "../testimonial/Testimonial";

const Home = () => {
  return (
    <motion.div
      className="mt-5 bg-dark text-light p-5 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-center mb-4 text-gradient text-uppercase"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        PatriManage
      </motion.h1>
      <motion.p
        className="text-center text-lg mb-8 fw-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        Gérez et analysez votre patrimoine personnel avec facilité. Utilisez nos
        outils pour suivre vos actifs, passifs, épargne et investissements.
      </motion.p>


      <Features />

      <Testimonials />

      <div className="p-5">
      <HomeChart />
      </div>
      <motion.div
        className="text-center mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      ></motion.div>

    </motion.div>
  );
};

export default Home;
