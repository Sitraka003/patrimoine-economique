import Argent from "./Argent.js";

export default class CompteCourant extends Argent {
  constructor(possesseur, libelle, valeur, date, salaire, trainDeVie, tauxAmortissement) {
    super(possesseur, libelle, valeur, date, salaire, trainDeVie);
    this.tauxAmortissement = tauxAmortissement; // Amortissement positif
  }

  getValeur(date) {
    const monthsDifference = (date.getFullYear() - this.date.getFullYear()) * 12 + (date.getMonth() - this.date.getMonth());
    const totalSalaire = this.salaire * (monthsDifference + 1);
    const totalTrainDeVie = this.trainDeVie * (monthsDifference + 1);
    const amortissement = this.valeur * this.tauxAmortissement * (monthsDifference + 1);

    const nouvelleValeur = this.valeur + totalSalaire - totalTrainDeVie - amortissement;
    return Math.max(nouvelleValeur, 0);
  }
}
