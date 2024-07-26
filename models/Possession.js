class Possession {
  constructor(possesseur, type, libelle, valeurDuPossession, date, tauxDepreciation) {
    this.possesseur = possesseur;
    this.type = type;
    this.libelle = libelle;
    this.valeurDuPossession = valeurDuPossession;
    this.date = date;
    this.tauxDepreciation = tauxDepreciation;
  }
}
module.exports = Possession;