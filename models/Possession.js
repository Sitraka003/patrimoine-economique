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

  getNewValue(){
    let today = new Date()
    let tauxAmortissement = this.tauxAmortissement
    const newDate = today.getFullYear -this.dateAchat ;
      let lostValue= (tauxAmortissement/100)*this.valeur ;
      let newValue = this.valeur - newDate*lostValue

      return newValue;

    }
}
module.exports = Possession;
