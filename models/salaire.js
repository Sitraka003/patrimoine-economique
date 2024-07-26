class Salaire {
    constructor(montantMensuel) {
      this.montantMensuel = montantMensuel;
    }
  
    getSalaireAnnuel() {
      return this.montantMensuel * 12;
    }
  }
  
  module.exports = Salaire;
  