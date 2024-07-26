class Possession {
  constructor(possesseur, libelle, nom, valeur, dateAchat, dateExpiration, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.name = nom;
    this.valeur = valeur;
    this.type = type;
    this.dateAchat = dateAchat;
    this.dateExpiration = dateExpiration;
    this.tauxAmortissement = tauxAmortissement;
  }

  getValueAt(dateEvaluation) {

    let dateDeCommencement = moment(this.buyingDate, 'YYYY-MM-DD');
    let dateDeFin = moment(dateEvaluation, 'YYYY-MM-DD');

    let difference = moment.duration(dateDeFin.diff(dateDeCommencement));
    let annee = diff.years();
    let mois = diff.months();
    let jour = diff.days();

    let raison = annee + mois / 12 + jour / 365;

    this.valeur -= this.tauxAmortissement * this.value * (ratio / 100);

    return this.value;
  }
}
module.exports = Possession;