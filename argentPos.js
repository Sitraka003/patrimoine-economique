import { Possession } from "./models/Possession.js";
/**
 * represente un type de possession Argent
 * @class ArgentPossession 
 * @constructor (possesseur,montant, libelle){
 * @type { String} le possesseur en tant que Personne
 * @type {Number} montant du type Argent,
 * @type {String} libelle du type Argent
 * @method getvaleurPossesion retourne la valeur Argent
 * }
 */
export class ArgentPossessions  extends Possession{
    constructor(possesseur,montant, libelle ){
        super( possesseur,'ArgentPossessions',libelle)
        this.montant=montant;
    }
    get montant(){
        return this.montant;
    }
    getvaleurPossesion(dateDonnee){
        return this.montant;
    }
}

class CompteCourant extends ArgentPossessions {
    constructor(possesseur, montant,salaire){
        //salaire fixe tous les 30 jours fin du mois
        super(possesseur,'ArgentPossessions',montant)
        this.salaire=salaire;
    }

    creditCompte(somme){
        this.montant += somme;
    }
    
    debitCompte(somme){
        this.montant -= somme;
    }

    ajouterSalaire(){
        setInterval(()=> {
            this.creditCompte(this.salaire)}
        ,30*24*60*60*1000)
        
    }
    
}

class CompteEpargne extends ArgentPossessions {
    constructor(possesseur, montant,interet){
        super(possesseur,'ArgentPossessions',montant,interet)
        this.montant=montant;
        this.interet=interet;
    }

    getSolde(){
        this.montant += montant*(this.interet/100);
        return this.montant;
    }
}

class Especes extends ArgentPossessions{
    constructor(possesseur,montant){
        super(possesseur,'ArgentPossessions',montant)
    }

    creditEspece(somme){
        this.montant += somme
    }
}

