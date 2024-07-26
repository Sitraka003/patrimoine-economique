class Possession {
  constructor(possesseur, libelle,dateAchat, valeur) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.dateAchat = dateAchat;
    this.valeur = valeur;
  }

  getValeur() {
    return this.valeur;
  }

  getDateAchat(){
    return this.dateAchat;
  }

  getPossesseur(){
    return this.possesseur;
  }
}
export default Possession;