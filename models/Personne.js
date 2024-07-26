import train_de_vie from "./TrainDeVie.js";
import Possession from "./Possession.js";
import BankAccount from "./BankAccount.js";

class Personne {
  constructor(nom, train_de_vie, possesion, salaire, BankAccount) {
    this.nom = nom;
    this.train_de_vie = train_de_vie;
    this.salaire = salaire;
    this.BankAccount = BankAccount;
  }
  
  afficher_details() {
    this.train_de_vie.details();
  }
}

export default Personne;