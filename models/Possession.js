/**
 * Classe qui designe une possession d'une personne
 */
export class Possession {
  /**
   * @param possesseur {Personne} posseseur de la possession
   * @param date {String} date d'accisition
   * @param libelle {String} libelle ou nom de la possession
   * @param value {number} valeur monetaire ou d'échage de la possession
   * @param interet {number} taux d'interet en pourcentage (par defaut annuel)
   * */
  constructor(possesseur, date, libelle, value, interet) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.date = new Date(date);
    this.valeur = value;

    this.interet = interet
    this.interetData = [this.interet, 365] // [x, y] --> + x% / yjour
  }

  /**
   * retourne la valeur de l'interet à une date donnée
   * @param _date {String} date de la valeur qu'on veut
   * @param rounded {boolean} indique si on doit arrondir ou pas
   *
   * @return {number}
   * */
  getInterestValue(_date, rounded=false) {
    // day * perday
    const date = new Date(_date);
    const dayBetween = (date - this.date) / (1000 * 60 * 60 * 24);
    const perDay = this.interetData[0] / this.interetData[1]

    const result = perDay * dayBetween;
    return rounded ? Math.floor(result): result;
  }

  /**
   * Retourne la valeur de la possession à une date donnée
   *
   * @param _date {String}
   * @param rounded
   *
   * @return {number}
   * */
  getValeur(_date, rounded=false) {
    const result = this.valeur + this.getInterestValue(_date, rounded)

    return rounded ? Math.round(result) : result;
  }

  /**
   * @
   * */
  applyInterest(_date, rounded=false) {
    if (this.valeur + this.getInterestValue(_date) >= 0) {
      this.valeur += this.getInterestValue(_date, rounded)
    }
    else {
      this.valeur = 0;
    }
  }

  updateValeur(_date, rounded=false) {
    this.applyInterest(_date, rounded)
  }
}
