import Possession from "./possessions/Possession.js";

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions.map(
      (p) =>
        new Possession(
          p.possesseur,
          p.libelle,
          p.valeur,
          new Date(p.dateDebut),
          p.dateFin ? new Date(p.dateFin) : null,
          p.tauxAmortissement,
          p.jour,
          p.valeurConstante
        )
    );
  }

  getValeur(date) {
    console.log(`Calculating value for date: ${date}`);
    let result = 0;
    for (const item of this.possessions) {
      console.log(`Processing possession: ${item.libelle}`);
      const valeur = item.getValeur(date);
      console.log(`Value for ${item.libelle}: ${valeur}`);
      result += valeur;
    }
    console.log(`Total value: ${result}`);
    return result;
  }

  addPossession(possession) {
    if (possession.possesseur !== this.possesseur) {
      console.log(
        `${possession.libelle} n'appartient pas à ${this.possesseur}`
      );
    } else {
      if (!this.possessions.some((p) => p.libelle === possession.libelle)) {
        this.possessions.push(possession);
      } else {
        console.log(`${possession.libelle} est déjà dans le patrimoine.`);
      }
    }
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(
      (p) => p.libelle !== possession.libelle
    );
  }
}
