
// Constructeur (constructor):
// Initialise une possession de type Argent avec un type (par exemple, Courant, Épargne, Espèce) et vérifie que le type est valide. S'il est invalide, affiche une erreur.
// getValeur(date):

// Retourne la valeur de l'argent à une date donnée si cette date est comprise entre dateDebut et dateFin. Sinon, retourne 0.
// possessions/bienMateriel.js
// Ce fichier définit une classe BienMateriel, qui hérite de la classe Possession.


import Possession from "./Possession.js";
import { TYPE_ARGENT } from "../../constante.js";

export default class Argent extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    try {
      if (!Object.values(TYPE_ARGENT).includes(type)) {
        throw new Error("Type d'argent invalide");
      }
      this.type = type;
    } catch (e) {
      console.error(e);
    }
  }

  getValeur(date) {
    if (date >= this.dateDebut && date <= this.dateFin) {
      return this.valeur;
    }
    return 0;
  }
}
