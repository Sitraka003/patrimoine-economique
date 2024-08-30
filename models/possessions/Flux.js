
import Possession from "./Possession.js";

export default class Flux extends Possession {
  // Si salaire => +
  // Si train de vie => -
  constructor(id, possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(id, possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement)
    this.valeur = 0;
    this.jour = jour;
    // this.source = source; // null || Compte
    // this.destination = destination; // Compte
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.valeurConstante = valeur

  }


  getValeur(date) {
    if (this.dateFin == this.dateDebut || this.dateFin <= new Date) {
      return 0;
    }
    else {
      function calculerNombreDeMois(date1, date2) {
        let annee1 = date1.getFullYear();
        let mois1 = date1.getMonth();
        let annee2 = date2.getFullYear();
        let mois2 = date2.getMonth();
        return (annee2 - annee1) * 12 + (mois2 - mois1);
      }

      const dateDebut10 = new Date(this.dateDebut);
      dateDebut10.setDate(10);

      const date10 = new Date(date);
      date10.setDate(10);

      let totalMois = calculerNombreDeMois(dateDebut10, date10);

      if (this.dateDebut.getDate() > 10) {
        totalMois -= 1;
      }
      if (date.getDate() < 10) {
        totalMois -= 1;
      }

      const montantTotal = totalMois * this.valeurConstante;

      return montantTotal;
    }
  }

}