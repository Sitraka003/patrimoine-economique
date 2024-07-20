class Argent extends Possession {
    constructor(possesseur, libelle, montant) {
      super(possesseur, "argent", libelle);
      this.montant = montant;
    }
  
    getValeur(date) {
      const dateActuelle = new Date(date);

      switch (this.libelle) {
        case 'especes': {
          return this.montant;
        }
        case 'compte_courant': {

        }
        case 'compte_epargne': {

        }
        default:
          return 0;
      }
    }
}


module.exports = Argent;