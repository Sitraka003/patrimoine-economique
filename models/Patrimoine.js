import Possession from "./Possession.js";

export default class Patrimoine {
  constructor(possesseur, possessions = []) {
    this.possesseur = possesseur;
    this.possessions = [...possessions];
  }

  getValeur(date) {
    return this.possessions.reduce((total, possession) => total + possession.getValeur(date), 0);
  }

  addPossession(possession) {
    if (possession.possesseur !== this.possesseur) {
      console.log(`Non`);
    } else {
      this.possessions.push(possession);
    }
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}
