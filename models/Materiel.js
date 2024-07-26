const Possession = require("./Possession");

class Materiel extends Possession {
    constructor(type, libelle, designation, valeur, date_achat) {
        super(type, libelle, valeur);
        this.designation = designation;
        this.valeur = valeur;
        this.date_achat = new Date(date_achat);
    }

    getValeur(check_date) {
        const currentDate = new Date(check_date);
        const years = currentDate.getFullYear() - this.date_achat.getFullYear();

        let newValue = this.valeur;
        for (let i = 0; i < years; i++) {
            newValue *= 0.90;
        }
        
        return newValue;
    }
}
exports.Materiel = Materiel;