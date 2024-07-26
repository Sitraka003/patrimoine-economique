export default class Possession {
  constructor(possesseur, libelle, valeur, date) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.date = date;
  }

  getValeur(date) {
    return this.valeur;
  }
}