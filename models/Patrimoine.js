const Possession = require('./possession');

class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur  = possesseur;
    this.date = date;
    this.possessions = possessions; // [Possession, Possession, ...]
  }

  getValeur(date) {
    let totalValeur = 0;
    const currentDate = new Date(this.date);
    const targetDate = new Date(date);
    const timeDiff = targetDate - currentDate;
    const yearsDiff = timeDiff / (1000 * 3600 * 24 * 365.25);

    this.possessions.forEach(possession => {
      let valeur = possession.valeur;
      if (possession.type === 'materiel') {
        valeur *= Math.pow(1 - possession.tauxDepreciation, yearsDiff);
      }
      totalValeur += valeur;
    });

    return totalValeur;
  }

  addPossession(possession) {
    this.possessions.push(possession);
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}

module.exports = Patrimoine;
