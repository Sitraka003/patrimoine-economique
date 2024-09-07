import Possession from "./possessions/Possession.js"; // Assurez-vous que le chemin est correct

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions;
  }

  getValeur(date) {
    let valeurTotale = 0;

    this.possessions.forEach((possession) => {
      if (possession.jour && possession.valeurConstante !== undefined) {
        // Traitement des flux
        const dateDebut = new Date(possession.dateDebut);
        const dateFin = possession.dateFin
          ? new Date(possession.dateFin)
          : new Date();
        if (date >= dateDebut && date <= dateFin) {
          // Calcul de la valeur du flux à la date donnée
          if (date.getDate() === possession.jour) {
            valeurTotale += possession.valeurConstante;
          }
        }
      } else {
        // Traitement des possessions normales
        const dateDebut = new Date(possession.dateDebut);
        const dateFin = possession.dateFin
          ? new Date(possession.dateFin)
          : new Date();
        if (date >= dateDebut && date <= dateFin) {
          const valeur =
            possession.valeur /
            (1 + possession.tauxAmortissement / 100) **
              this.getYears(date, dateDebut);
          valeurTotale += valeur;
        }
      }
    });

    return valeurTotale;
  }

  getYears(date, dateDebut) {
    return (date - dateDebut) / (1000 * 60 * 60 * 24 * 365);
  }
}
