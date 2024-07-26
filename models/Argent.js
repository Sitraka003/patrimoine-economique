const Possession = require("./Possession");

class Argent extends Possession {
    constructor(type, libelle, type_montant, valeur) {
        super(type, libelle, valeur);
        this.type_montant = type_montant;
    }

    getValeur(check_date) {
        const currentDate = new Date(check_date);
        const months = (currentDate.getFullYear() - this.date.getFullYear()) * 12 + currentDate.getMonth() - this.date.getMonth();
        const diminution = months * 500000;

        return this.valeur - diminution;
    }
}

exports.Argent = Argent;