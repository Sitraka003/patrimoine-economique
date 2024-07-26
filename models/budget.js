class budget {
    constructor(Salaire, TrainDeVie){
        this.Salaire = Salaire;
        this.TrainDeVie = TrainDeVie;
    }

    verification(){
        const revenu = this.Salaire.revenu;
        const depense = this.TrainDeVie.totalMensuel;

        if(revenu >= depense) return true;
        else return false;
    }
}