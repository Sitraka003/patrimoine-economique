import Possession from "./possessions/Possession.js"; // Assurez-vous que le chemin est correct

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions;
  }

  getValeur(date) {
    let totalValeur = 0;

    for (const possession of this.possessions) {
      if (possession.dateFin && new Date(possession.dateFin) < date) {
        continue; // La possession est fermée, ignorer
      }

      if (possession.jour && possession.valeurConstante) {
        // C'est un flux, vérifier le jour
        const currentDay = date.getDay();
        if (currentDay === possession.jour) {
          totalValeur += possession.valeurConstante;
        }
      } else {
        // C'est une possession normale
        const valeur = this.calculerValeurPossession(possession, date);
        totalValeur += valeur;
      }
    }

    return totalValeur;
  }

  calculerValeurPossession(possession, date) {
    // Implémenter votre logique de calcul pour les possessions normales
    // Par exemple, tenir compte de la dépréciation en fonction de la date
    let valeurActuelle = possession.valeur;

    if (possession.dateDebut && new Date(possession.dateDebut) > date) {
      return 0; // La possession n'a pas encore commencé
    }

    if (possession.tauxAmortissement) {
      // Calculer la dépréciation
      const age =
        (date - new Date(possession.dateDebut)) / (1000 * 60 * 60 * 24 * 365);
      const amortissement =
        (age / possession.tauxAmortissement) * possession.valeur;
      valeurActuelle -= amortissement;
    }

    return Math.max(valeurActuelle, 0); // Valeur ne peut pas être négative
  }
}
