// Patrimoine.js
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
    let valeur = this.possessions.reduce(
      (acc, possession) => acc + possession.getValeur(date),
      0
    );
    valeur += this.flux.reduce((acc, flux) => acc + flux.getValeur(date), 0); // Ajoute la valeur des flux
    return valeur;
  }
}
