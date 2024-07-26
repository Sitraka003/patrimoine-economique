import Salaire from "./salaire";
let prompt = require("prompt-sync");

class TrainDeVie{
    spentMoney = [];

    constructor(cout,description,spentMoney){
        this.cout= cout;
        this.description = description;
        this.spentMoney = spentMoney;
    }

    i = 0;

    spend(amount){
        this.montant -=amount;
        i += 1;
        let raison = prompt("Veuillez donner une description : ")
        let date = new Date;
        this.spentMoney.push("depense " + i + "\n motif : " + raison + "\n Date : " + date)
        return "Vous avez depensé " + amount + "Ar, il vous reste " + this.montant + "Ar \n Motif : " + 
    raison
}

    seeSpent(){
        return this.spentMoney;
    }

    
}