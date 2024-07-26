class Possession {
  constructor(possesseur, type, libelle, valeur, tauxDepreciation) {
    this.possesseur = possesseur;
    this.type = type;
    this.libelle = libelle;
    this.valeur = valeur;
    this.tauxDepreciation = tauxDepreciation || 0;
  }
}

module.exports = Possession;
