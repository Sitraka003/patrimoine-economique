import {Salaire} from './Salaire.js'
import {TrainDeVie} from './TrainDeVie.js'

export class Patrimoine {
  constructor(possesseur, dateEvaluation, possessions) {
    this.possesseur  = possesseur;
    this.dateEvaluation = dateEvaluation
    this.possessions = possessions; // [Possession, Possession, ...]
  }

  getValeur() {
    return this.possessions
            .map(possession => {
              if (possession instanceof Salaire) {
                return possession.getValueAt(this.getTotalTrainDeVie(this.dateEvaluation), this.dateEvaluation)
              } else {
                return possession.getValueAt(this.dateEvaluation)
              }
            })
            .reduce((a, b) => a + b, 0);
  }

  getTotalTrainDeVie() {
    return this.possessions
            .filter(possession => possession instanceof TrainDeVie)
            .map(possession => possession.getValueAt(this.dateEvaluation))
            .reduce((a, b) => a + b, 0);
  }



  addPossession(possession) {
    this.possessions.push(possession);
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}



let pos = []
let patrimoine = new Patrimoine("me", new Date(2024, 4, 3), pos);

let salaire = new Salaire("me", "salaire", "compte courant", 2000, new Date(2024, 2, 30), null);
patrimoine.addPossession(salaire);

let depense1 = new TrainDeVie("me", "dépense1", "loyer", 500, new Date(2024, 2, 30), null);
patrimoine.addPossession(depense1);

console.log(patrimoine.getValeur());