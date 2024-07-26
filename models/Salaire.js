class Salaire {
    constructor(montant, periode) {
        this.montant = montant; // montant du salaire
        this.periode = periode; // période de paiement (mensuel, annuel, etc.)
    }
    
    calculerTrainDeVie() {
        if (this.montant < 2000) {
          return new TrainDeVie('modeste');
        } else if (this.montant >= 2000 && this.montant < 5000) {
          return new TrainDeVie('moyen');
        } else {
          return new TrainDeVie('élevé');
        }
      }
}

module.exports = Salaire;