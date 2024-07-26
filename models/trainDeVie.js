class TrainDeVie {
    constructor(loyer, nourriture, transport, vacances) {
      this.loyer = loyer;
      this.nourriture = nourriture;
      this.transport = transport;
      this.vacances = vacances;
    }
  
    getDepensesMensuelles() {
      return this.loyer + this.nourriture + this.transport + this.vacances;
    }
  
    getDepensesAnnuelles() {
      return this.getDepensesMensuelles() * 12;
    }
  }
  
  module.exports = TrainDeVie;
  