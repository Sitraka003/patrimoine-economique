class Patrimoine {
    constructor(date, possessions) {
        this.date = date;
        this.possessions = possessions; // [Possession, Possession, ...]
    }
    getValeur(date) {
        let valeurFinal = 0;
        for (let i = 0; i < this.possessions.length(); i++) {
            valeurFinal += this.possessions[i].getValeur();
        }
        return valeurFinal;
    }
    addPossession(possession) {
        this.possessions.push(possession);
    }
    removePossession(possession) {
        this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
    }
}

module.exports = Patrimoine;