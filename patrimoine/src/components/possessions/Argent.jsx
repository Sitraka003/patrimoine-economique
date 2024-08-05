import Possession from "./Possession.jsx";

export default class Argent extends Possession {
    constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
      super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
      try {
        /*if (!TYPE_ARGENT.values().includes(type)) {
          throw new Error("Type d'argent invalide");
        }*/
        this.type = type;
      }
      catch (e) {
        console.error(e);
      }
    }
  }