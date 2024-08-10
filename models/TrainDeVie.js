class TrainDeVie{
    constructor(loyer, nourriture, loisir, transport, vacances, soins, materiaux, impots){
        this.loyer = loyer;
        this.nourriture = nourriture;
        this.loisir = loisir;
        this.transport = transport;
        this.vacances = vacances;
        this.soins = soins;
        this.materiaux = materiaux;
        this.impots = impots;
    }

    totalMensuel(){
        return this.loyer + 
        this.nourriture +
        this.loisir +
        this.transport +
        this.vacances +
        this.soins +
        this.materiaux +
        this.impots;
    }
}

module.exports = TrainDeVie;