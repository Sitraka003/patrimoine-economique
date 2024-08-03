// THIS MAY CHANGE IN THE FUTURE
// dateDebut = 01/01/2024
// montant = 400_000
// jour = 1
import Possession from "./Possession.js";
export default class Flux extends Possession {
  // Si salaire => +
  // Si train de vie => -
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur);
    this.dateDebut = new Date(dateDebut);
    this.dateFin = new Date(dateFin);
    this.jour = jour;
    this.tauxAmortissement = tauxAmortissement;


    
    // this.source = source; // null || Compte
    // this.destination = destination; // Compte
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
  }

  getValeur(date) {
    // TODO: calculer le montant total du flux en prenant compte du jour de versement
    // calcul différence entre date et date debut

    date = new Date(date);

    const differenceDate = {
      annee: date.getFullYear() - this.dateDebut.getFullYear(),
      mois: date.getMonth() - this.dateDebut.getMonth(),
    };

    let totalMois = differenceDate.annee * 12 + differenceDate.mois;

    if (date.getDate() < this.dateDebut.getDate()) {
      totalMois--;
    }

    let valeurTotal = this.valeur * totalMois;

    return valeurTotal;
  }
}