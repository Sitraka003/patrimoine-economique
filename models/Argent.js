import Possession from "./Possession.js";

export default class Argent extends Possession {
  constructor(possesseur, libelle, valeur, date, salaire, trainDeVie) {
    super(possesseur, libelle, valeur, date);
    this.salaire = salaire;
    this.trainDeVie = trainDeVie; 
  }

  getValeur(date) {
    const monthsDifference = (date.getFullYear() - this.date.getFullYear()) * 12 + (date.getMonth() - this.date.getMonth());
    const totalSalaire = this.salaire * (monthsDifference + 1);
    const totalTrainDeVie = this.trainDeVie * (monthsDifference + 1);
    const nouvelleValeur = this.valeur + totalSalaire - totalTrainDeVie;
    return Math.max(nouvelleValeur, 0);
  }
}
