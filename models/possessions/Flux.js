import Possession from "./Possession.js";

export default class Flux extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    this.jour = jour;
  }

  getValeur(date) {
    const differenceDate = {
      year: date.getFullYear() - this.dateDebut.getFullYear(),
      month: date.getMonth() - this.dateDebut.getMonth(),
    };

    let valeurTotal = 0;
    if (differenceDate.year > 0 || differenceDate.month > 0) {
      valeurTotal = this.valeur * differenceDate.month + this.valeur * differenceDate.year * 12;
    }

    return valeurTotal;
  }
}
