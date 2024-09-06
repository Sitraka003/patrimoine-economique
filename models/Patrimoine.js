import Possession from "./possessions/Possession.js";

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions.map((possessionData) => {
      if (possessionData.jour !== undefined) {
        // Si c'est un flux
        return new Flux(
          possessionData.possesseur,
          possessionData.libelle,
          possessionData.valeurConstante,
          new Date(possessionData.dateDebut),
          possessionData.dateFin ? new Date(possessionData.dateFin) : null,
          possessionData.tauxAmortissement,
          possessionData.jour
        );
      } else {
        // Si c'est une possession normale
        return new Possession(
          possessionData.possesseur,
          possessionData.libelle,
          possessionData.valeur,
          new Date(possessionData.dateDebut),
          possessionData.dateFin ? new Date(possessionData.dateFin) : null,
          possessionData.tauxAmortissement
        );
      }
    });
  }

  getValeur(date) {
    // Calculer la valeur totale du patrimoine à une date donnée
    return this.possessions.reduce((total, possession) => {
      return total + possession.getValeur(date);
    }, 0);
  }
}
