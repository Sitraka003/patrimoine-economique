import { Possession } from "./models/Possession.js";

export class TrainDeVie extends Possession{
    constructor(possesseur,montant,libelle){
        super(possesseur,montant,libelle)
    }
    getValeurs(){
        return this.montant;
    }
}