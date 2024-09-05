class Argent extends Possession {
    constructor(possesseur, libelle, montant) {
        super(possesseur, "argent", libelle);
        this.montant = montant;
    }

    getValeur(date) {
        return this.montant;
    }
}


export default Argent;