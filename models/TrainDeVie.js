const Possession = require("./Possession");

class TrainDeVie extends Possession {
    constructor(type, libelle, valeur, date) {
        super(type, libelle, valeur);
        this.date = new Date(date);
    }

    getValeur(check_date) {
        const currentDate = new Date(check_date);
        const months = (currentDate.getFullYear() - this.date.getFullYear()) * 12 + currentDate.getMonth() - this.date.getMonth();
        const augmentation = months * 500000;

        return this.valeur + augmentation;
    }
}