import TYPES from "./Constant.js";
import Possession from "./Possession.js";

export default class Argent extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    try {
      if (!Object.values(TYPES).includes(type)) {
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
