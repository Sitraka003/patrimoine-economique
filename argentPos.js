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
class ArgentPossessions  extends Possession{
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