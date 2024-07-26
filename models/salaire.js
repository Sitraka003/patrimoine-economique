let prompt = require("prompt-sync");

class Salaire{
    revenuTotal =0;
    montant = 0
    constructor(montant,date_de_reception, revenuTotal){
        this.montant = montant;
        this.date_de_reception = date_de_reception;
        this.revenuTotal = revenuTotal;
    }

    

    paid(salary){
        this.revenuTotal += salary;
        return "vous avez au total " + this.revenuTotal + "Ar"
    }

    spendSalary(amount){
        this.montant -=amount;
        let raison = prompt("Veuillez donner une description : ")
        return "Vous avez depensé " + amount + "Ar, il vous reste " + this.montant + "Ar \n Motif : " + 
    raison}

}

module.exports = Salaire;