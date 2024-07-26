import Possession from "./Possession.js";
class Actif extends Possession {
    constructor(possesseur, libelle, montant) {
        super(possesseur, "argent", libelle);
        this.montant = montant;
    }

    getValeur(date) {
        return this.montant;
    }
}


export default Actif;