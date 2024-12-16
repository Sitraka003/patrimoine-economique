import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie Dupont",
      feedback:
        "Cette application m'a vraiment aidée à organiser mes finances et à mieux comprendre mes investissements.",
    },
    {
      name: "Jean Martin",
      feedback:
        "Simple d'utilisation et très intuitive, je recommande vivement !",
    },
    {
      name: "Sophie Laurent",
      feedback:
        "Grâce à cette application, j'ai pu améliorer la gestion de mon patrimoine et atteindre mes objectifs financiers plus rapidement.",
    },
    {
      name: "Pierre Bernard",
      feedback:
        "Un outil indispensable pour quiconque souhaite prendre le contrôle de ses finances.",
    },
  ];

  return (
    <div className="mt-2 bg-dark text-light p-5 rounded-lg shadow-lg">
      <h2 className="text-center mb-4 text-gradient">Témoignages</h2>
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="col-md-6 mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="card bg-secondary text-light p-4 shadow-sm h-100">
              <p className="mb-0 fst-italic">{testimonial.feedback}</p>
              <p className="text-muted mt-2 fw-bold">- {testimonial.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
