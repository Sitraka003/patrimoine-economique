import Possession from "./Possession.js";

export default class Flux extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    this.jour = jour;
  }

  getValeur(date) {
    const differenceDate = {
      annee: date.getFullYear() - this.dateDebut.getFullYear(),
      mois: date.getMonth() - this.dateDebut.getMonth(),
    };

    let valeurTotal = 0;
    if (differenceDate.annee > 0 || differenceDate.mois > 0) {
      valeurTotal = this.valeur * differenceDate.mois + this.valeur * differenceDate.annee * 12;
    }

    return valeurTotal;
  }
}
