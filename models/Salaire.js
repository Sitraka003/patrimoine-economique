import { Possession } from './Possession.js';
import moment from "moment";

export class Salaire extends Possession {
    constructor(possesseur, libelle, nom, valeur, dateAchat, dateExpiration) {
        super(possesseur, libelle, nom, valeur, dateAchat, dateExpiration, 0);
        this.valeurConstante = valeur;
    }
    
    getValueAt(totalTrainDeVie, dateEvaluation) {
        let commencement = moment(this.dateAchat).startOf('day');
        const fin = moment(dateEvaluation).startOf('day');

        while (commencement.isSameOrBefore(fin)) {
            
            if (commencement.clone().endOf('month').isSame(commencement, 'day')) {
                this.valeur += this.valeurConstante;
            }
            
            if (commencement.clone().startOf('month').isSame(commencement, 'day')) {
                this.valeur += totalTrainDeVie;
            }
            
            commencement.add(1, 'day');
        }
        return this.valeur - totalTrainDeVie;
    }
}