/*Since the "possesseur" is just an instance of personne
* Why not use personne as the possesseur
*/

import Personne from "./Personne.js";

class Possession {
  constructor(price, type, libelle, date, AmortizationRate) {
    this.price = price;
    this.type = type;
    this.libelle = libelle;
    //date d'achat, en année
    this.date = date;
    this.AmortizationRate = AmortizationRate;
  }

  getPossessionPrice() { return this.price; }

  getDate() { return this.date; }

  PriceAmortization() {
    this.price -= (this.price*this.AmortizationRate) / 100
  }
}
export default Possession;