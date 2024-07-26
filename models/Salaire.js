import {Possession} from './Possession'
import moment from "moment";

class Salaire extends Possession {
    constructor(possesseur, libelle, nom, valeur, dateAchat, dateExpiration, tauxAmortissement) {
        super(possesseur, libelle, nom, valeur, dateAchat, dateExpiration, tauxAmortissement),
        this.valeurConstante = valeur;
    }
    
    getValueAt(dateEvaluation) {
        dateEvaluation = moment(dateEvaluation, 'YYYY-MM-DD');
        const finDuMois = date.clone().endOf('month');

        if (estfinDuMois) {
            this.value += this.constantValue * months;
            console.log(` +++ "Salary" added successfully! +++ `);
        }

    }
}