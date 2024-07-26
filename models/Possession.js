import moment from "moment";

export class Possession {
  constructor(possesseur, libelle, nom, valeur, dateAchat, dateExpiration, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.name = nom;
    this.valeur = valeur;
    this.dateAchat = dateAchat;
    this.dateExpiration = dateExpiration;
    this.tauxAmortissement = tauxAmortissement;
  }

  getValueAt(dateEvaluation) {
    let dateDeCommencement = moment(this.dateAchat);
    let dateDeFin = moment(dateEvaluation);

    let moisEnTotalite = dateDeFin.diff(dateDeCommencement, 'months');
    dateDeCommencement.add(moisEnTotalite, 'months');
    let jour = dateDeFin.diff(dateDeCommencement, 'days');
    let annee = Math.floor(moisEnTotalite / 12);
    let mois = moisEnTotalite % 12;

    
    let raison = annee + mois / 12 + jour / 365;
    
    this.valeur -= this.tauxAmortissement * this.valeur * (raison / 100);

    return this.valeur;
  }
}
