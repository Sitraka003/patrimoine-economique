// THIS MAY CHANGE IN THE FUTURE
// dateDebut = 01/01/2024
// montant = 400_000
// jour = 1
/*import Possession from "./Possession.js";
export default class Flux extends Possession {
  // Si salaire => +
  // Si train de vie => -
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement)
    this.valeur = 0;
    this.jour = jour;
    // this.source = source; // null || Compte
    // this.destination = destination; // Compte
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.valeurConstante = valeur
  }


  getValeur(date) {
    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
      let compteur = 0;

      if (debut.getDate() < jourJ) {
        compteur++;
      }

      if (dateEvaluation.getDate() >= jourJ && !(debut.getFullYear() === dateEvaluation.getFullYear() && debut.getMonth() === dateEvaluation.getMonth())) {
        compteur++;
      }

      let totalMois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 + (dateEvaluation.getMonth() - debut.getMonth()) - 1;

      compteur += Math.max(0, totalMois);

      return compteur;
    };

    // Calculer le montant total sans modifier this.valeur
    const totalMois = nombreDeMois(this.dateDebut, date, this.jour);
    const montantTotal = totalMois * this.valeurConstante;

    return montantTotal;
  }
}*/
import Possession from "./Possession.js";

export default class Flux extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    this.jour = jour;
  }

  getValeur(date) {
    // Calculer la différence entre la date actuelle et la date de début en mois
    const differenceDate = {
      annee: date.getFullYear() - this.dateDebut.getFullYear(),
      mois: date.getMonth() - this.dateDebut.getMonth(),
    };

    // Ajouter les années converties en mois
    const totalMois = differenceDate.annee * 12 + differenceDate.mois;

    // Calculer le nombre de paiements effectués
    let nombrePaiements = 0;
    if (date.getDate() >= this.jour) {
      nombrePaiements = totalMois + 1; // Inclure le mois en cours si le jour est passé
    } else {
      nombrePaiements = totalMois; // Sinon, n'inclure que les mois passés
    }

    // Calculer le montant total
    const valeurTotal = this.valeur * nombrePaiements;

    return valeurTotal;
  }
}
