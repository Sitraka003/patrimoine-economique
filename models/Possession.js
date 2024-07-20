class Possession {
  constructor(possesseur, type, libelle,valeur,tauxAmortissement,dateAchat,dateVente) {
    this.possesseur = possesseur;
    this.type = type;
    this.libelle = libelle;
    this.valeur = valeur;
    this.tauxAmortissement = tauxAmortissement;
    this.dateAchat = dateAchat;
    this.dateVente = dateVente;
    
  }
  

  showPossession(possession){
    console.log('Prorpriétaire : ' + this.possesseur + "\n type de produit : " + this.type + " \n valeur :" + this.valeur)
  }

  getNewValue(possession){
    let today = new Date()
    const newDate = today.getFullYear -this.dateAchat ;
      let lostValue= (10/100)*this.valeur ;
      let newValue = this.valeur - newDate*lostValue

      return newValue;

    }
}
module.exports = Possession;
