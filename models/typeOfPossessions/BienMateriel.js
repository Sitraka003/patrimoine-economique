const Possession = require("../Possession");

class BienMateriel extends Possession {
    constructor(possesseur, libelle, valeurInitiale, dateAchat, tauxDepreciationAnnuel) {
      super(possesseur, "bien_materiel", libelle);
      this.valeurInitiale = valeurInitiale;
      this.dateAchat = new Date(dateAchat);
      this.tauxDepreciationAnnuel = tauxDepreciationAnnuel;
    }
  
    getValeur(date) {
      const dateActuelle = new Date(date);
      const anneesEcoulees = (dateActuelle - this.dateAchat) / (1000 * 60 * 60 * 24 * 365);
      let valeurActuelle = this.valeurInitiale * Math.pow((1 - (this.tauxDepreciationAnnuel / 100)), anneesEcoulees);
        return valeurActuelle;
    }   


}
module.exports = BienMateriel;