import Possession from "./Possession.js";
import Flux from "./Flux.js";

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions.map((p) => {
      if (p.jour !== undefined) {
        return new Flux(
          p.possesseur,
          p.libelle,
          p.valeur,
          new Date(p.dateDebut),
          p.dateFin ? new Date(p.dateFin) : null,
          p.tauxAmortissement,
          p.jour
        );
      } else {
        return new Possession(
          p.possesseur,
          p.libelle,
          p.valeur,
          new Date(p.dateDebut),
          p.dateFin ? new Date(p.dateFin) : null,
          p.tauxAmortissement
        );
      }
    });
  }

  getValeur(date) {
    let result = 0;
    for (const item of this.possessions) {
      result += item.getValeur(date);
    }
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
