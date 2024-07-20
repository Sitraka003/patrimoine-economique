class Possession {
  constructor(possesseur, libelle,dateAchat, valeur) {
    this.possesseur = possesseur;
    this.type = type;
    this.libelle = libelle;
    this.dateAchat = dateAchat;
    this.valeur = valeur;
  }

  getValeur() {
    // Calculer la valeur de la possession en fonction de la date
    //...
    // Par exemple, si la valeur dépend de la date, il faudra utiliser une fonction de calcul
    // pour obtenir la valeur actuelle de la possession à la date donnée
    // Par exemple, pour une possession immobilière, on pourrait utiliser l'API de la Banque Mondiale
    // pour obtenir la valeur actuelle du bien à la date donnée
    //...
    // Retourner la valeur actuelle de la possession

    return this.valeur;
  }

  getDateAchat(){
    return this.dateAchat;
  }
}
module.exports = Possession;