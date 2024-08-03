import Possession from "./possesions/Possession.js";
class TrainDeVie extends Possession {
    constructor(possesseur, libelle, coutMensuel) {
        super(possesseur, "train_de_vie", libelle);
        this.coutMensuel = coutMensuel;
    }

    getValeur(date) {
        return 0;
    }
}

export default TrainDeVie;