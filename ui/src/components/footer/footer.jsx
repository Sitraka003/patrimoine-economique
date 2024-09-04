import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className=" text-center">
        <p>© 2024 Patrimoine Calculator. Tous droits réservés</p>
        <div className="d-flex justify-content-center">
          <a
            href="https://www.facebook.com/rantoskaim.taxmen/"
            className="text-light mx-3"
          >
            <FaFacebookF />
          </a>
          <a href="#" className="text-light mx-3">
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/handraina-ranto-78a00b299/"
            className="text-light mx-3"
          >
            <FaLinkedin />
          </a>
        </div>
        <p className="mt-3">
          Besoin d'aide ?{" "}
          <a href="hei.ranto.2@gmail.com" className="text-primary">
            Contactez-me (Ranto)
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
