import {Possession} from './Possession.js';

export class TrainDeVie extends Possession {

    constructor(possesseur, libelle, nom, valeur, dateAchat, dateExpiration) {
        super(possesseur, libelle, nom, -valeur, dateAchat, dateExpiration, 0)
    }

}