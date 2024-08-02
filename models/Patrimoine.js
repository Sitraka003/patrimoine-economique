export class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur  = possesseur;
    this.date = date
    this.possessions = possessions; // [Possession, Possession, ...]
  }
  addPossession(possession) {
    this.possessions.push(possession);
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
  calculerAmortissement() {
    const periode = 1; // période de paiement (1 an)
    const amortissement = this.possessions.reduce((acc, possession) => acc + possession.calculerAmortissement(periode), 0);
    return amortissement;
  }
}

module.exports = Patrimoine;