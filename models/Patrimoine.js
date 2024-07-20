/**
 * Classe qui represente une patrimoine d'une personne ( ensemble de possessions )
 */
export class Patrimoine {
  /**
   * @param possesseur {Personne}
   * @param date {String}
   * @param possessions {Possession[]}
   * */
  constructor(possesseur, date, possessions=[]) {
    this.possesseur  = possesseur;
    this.date = new Date(date);

    this.possessions = possessions; // [Possession, Possession, ...]
  }

  /**
   * retourne la valeur total de tout les patrimoine à une date donnée
   *
   * @param _date {String} Date de la valeur qu'on veut
   * @param rounded {boolean} indique si on veut une valuer arrondie ou non
   * @param roundEach {boolean} indique si on veut arrondir la valeur de chaque possession
   * */
  getValeur(_date, rounded=false, roundEach=false) {
    let result = 0;
    this.possessions.forEach(possession => {
      result += possession.getValeur(_date, roundEach);
    })

    return rounded ? Math.round(result) : result;
  }

  /**
   * Ajoute une possession au patrimoine
   *
   * @param possession {Possession} possession à ajouter
   * */
  addPossession(possession) {
    this.possessions.push(possession);
  }

  /**
   * Enleve une possession au patrimoine
   *
   * @param possession {Possession} possession à enlever
   * */
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}

