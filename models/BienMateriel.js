import Possession from "./Possession.js";

export default class BienMateriel extends Possession {
  constructor(possesseur, libelle, valeur, date, taux) {
    super(possesseur, libelle, valeur, date);
    this.taux = taux;
  }

  getValeur(date) {
    const amortissementAnnuel = this.valeur * this.taux;
    const dureeEnAnnees = (date.getFullYear() - this.date.getFullYear()) + 
      (date.getMonth() - this.date.getMonth()) / 12;

    const valeurAmortie = this.valeur - amortissementAnnuel * Math.floor(dureeEnAnnees);

    return Math.max(valeurAmortie, 0);
  }
}
