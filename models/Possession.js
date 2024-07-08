/**
 * Classe qui designe une possession d'une personne
 */
class Possession {
  constructor(possesseur, type, libelle) {
    this.possesseur = possesseur;
    this.type = type;
    this.libelle = libelle;
  }
}
module.exports = Possession;