class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur  = possesseur;
    this.date = new Date(date);
    this.possessions = possessions; // [Possession, Possession, ...]
  }
  getValeur(date) {
    return 
  }
  addPossession(possession) {
    this.possessions.push(possession);
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}



module.exports = Patrimoine;
