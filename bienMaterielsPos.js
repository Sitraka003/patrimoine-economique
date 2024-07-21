import { Possession } from "./models/Possession.js";
/**
 * represente un type de possession Argent
 * @class BienMateriels 
 * @constructor (possesseur,libelle,dateAcquisition, valeurAcquisition, perteDeValeur){
 * le possesseur en tant que Personne
 * montant du type BienMateriels,
 * libelle du type BienMateriels,
 * @type {Date} dateAcquisition remise en main,
 * @type {Number} valeurAcquisition du bien,
 * @type {Number} perteDeValeur en % annuel
 * @method calculAmortissement
 * @argument {Date} dateDonnee pour le calcul
 * @returns {Number} valeur amortissement
 * }
 */
class BienMateriels extends Possession {
    constructor(possesseur,libelle,dateAcquisition, valeurAcquisition, perteDeValeur){
        super(possesseur,'BienMateriels',libelle)
        this.dateAcquisition = dateAcquisition;
        this.valeurAcquisition = valeurAcquisition;
        this.perteDeValeur = perteDeValeur;
    }

    calculAmortissement(dateDonnee){
        /*options en mois pour les amortissements et temps d'acquisition en mois 
                si tempsAcquisition = 12 donc calcul en un an
        */
    const dateActuelle = new Date();
    const dateCalcul = new Date(dateDonnee);
    const anneeActuels = dateActuelle.getFullYear();
    const moisActuel = dateActuelle.getFullYear();
    const anneeCalculs = dateCalcul.getFullYear();
    const moisCalcul = moisActuel.getMonth();
    const tempsAcquisition = ((anneeActuels - anneeCalculs)*12) +(moisActuel-moisCalcul);    
    let perte = ((this.valeurAcquisition * (this.perteDeValeur/100))) * (tempsAcquisition/12);
        return perte;
    }
            
}
