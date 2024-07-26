class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur = possesseur;
    this.date = date
    this.possessions = Array.isArray(possessions) ? possessions : []; // [Possession, Possession, ...]
  }

  getValeur(date) {
    let valeurTotal = 0;

    for (const possession of this.possessions) {
      if (possession.type === "especes" || possession.type === "compte") {
        valeurTotal += possession.valeurDuPossession;
      } else if (possession.type === "depriciant") {
        const anneeDepuisAchat = date.getFulYear() - possession.date.getFulYear();
        const tauxDepreciation = possession.tauxDepreciation; 
        let valeurActual = possession.valeurDuPossession * Math.pow(1 - tauxDepreciation, anneeDepuisAchat);

        valeurTotal += valeurActual;
      }
    }

    return valeurTotal;
  }

  getCompteCourant() {
    let value = 0;
    this.possessions.filter(p => p.libelle === 'Compte courant').map(e => value += e.valeurDuPossession)
    return value;
  }

  addPossession(possession) {
    this.possessions.push(possession);
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }

  getValueTotal(){
    let value = 0;
    for (const possession of this.possessions) {
      value += possession.valeurDuPossession
    }
    return value;
  }
}

module.exports = Patrimoine;