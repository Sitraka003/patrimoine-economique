import Personne from "./Personne.js";
import Possession from "./Possession.js";

class Patrimoine{
  constructor(date, Personne, possession) {
    //to represent a point in time
    this.date = date;
    this.Personne = Personne;
    this.possession = [possession];
  }

  Addpossession(Possession) {
    this.possession.push(Possession);
  }

  //voir la liste de bien que la personne possède
  listPossession() {
    for(let i of this.possession) {
      console.log(i);
    }
  }

  TotalPossessionPrice() {
    let total = 0;
    for(let i = 0; i < this.possession.length; i++) {
      total += (
        this.possession[i].getPossessionPrice() - 
        (
          this.possession[i].PriceAmortization() * 
          this.date - this.possession[i].getDate()
        )
      );
    }
    return total;
  }
}

export default Patrimoine;