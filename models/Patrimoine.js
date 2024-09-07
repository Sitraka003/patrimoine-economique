import Possession from "./possessions/Possession.js"; // Assurez-vous que le chemin est correct

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions;
  }

  getValeur(date) {
    let valeurTotale = 0;

    this.possessions.forEach((possession) => {
      const dateDebut = new Date(possession.dateDebut);
      const dateFin = possession.dateFin
        ? new Date(possession.dateFin)
        : new Date();

      if (possession.jour && possession.valeurConstante !== undefined) {
        // Traitement des flux
        if (date >= dateDebut && date <= dateFin) {
          // Vérifiez si la date actuelle est le jour du flux
          if (date.getDate() === possession.jour) {
            valeurTotale += possession.valeurConstante;
          }
        }
      } else {
        // Traitement des possessions normales
        if (date >= dateDebut && date <= dateFin) {
          const valeurAmortie = this.calculateValeur(possession, date);
          valeurTotale += valeurAmortie;
        }
      }
    });

    return valeurTotale;
  }

  calculateValeur(possession, date) {
    // Calcul de la valeur actualisée en fonction du taux d'amortissement
    const dateDebut = new Date(possession.dateDebut);
    const nombreAnnees = this.getYears(date, dateDebut);
    const valeurAmortie =
      possession.valeur /
      (1 + possession.tauxAmortissement / 100) ** nombreAnnees;
    return valeurAmortie;
  }

  getYears(date, dateDebut) {
    return (date - dateDebut) / (1000 * 60 * 60 * 24 * 365);
  }
}
