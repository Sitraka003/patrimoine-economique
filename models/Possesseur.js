class Possesseur {
    constructor() {
        this.possessions = [];
    }

    ajouterPossession(possession) {
        this.possessions.push(possession);
    }

    getPossession(type) {
        return this.possessions.find(p => p.type === type);
    }

    payerFrais(trainDeVie) {
        const argent = this.getPossession("argent");
        if (argent && argent.montant >= trainDeVie.coutMensuel) {
            argent.montant -= trainDeVie.coutMensuel;
            return true;
        }
        return false;
    }
}

export default Possesseur;


//cette classe gère les possessions du possesseur