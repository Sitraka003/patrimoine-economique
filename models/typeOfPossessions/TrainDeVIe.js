import { Possession } from "../Possession.js";
export class TrainDeVie extends Possession {
    constructor(possesseur, libelle, coutMensuel) {
      super(possesseur, "train_de_vie", libelle);
      this.coutMensuel = coutMensuel;
    }
  
    getValeur(date) {
      return 0;
    }
}
