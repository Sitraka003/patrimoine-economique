import Possession from "./Possession.js";
import TYPES from "../../constante.js";

let typeArgent = Object.values(TYPES);

export default class Argent extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    try {
      if (!typeArgent.includes(type)) {
        throw new Error("Type d'argent invalide");
      }
      this.type = type;
    }
    catch (e) {
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