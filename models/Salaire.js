class Salaire {
    constructor(montant, dateDebut) {
        this.montant = montant;
        this.dateDebut = new Date(dateDebut);
    }

    getMontant() {
        return this.montant;
    }

    setMontant(nouveauMontant) {
        this.montant = nouveauMontant;
    }
}

module.exports = Salaire;
