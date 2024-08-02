export class Possession {
  constructor(possesseur, type, libelle) {
    this.possesseur = possesseur;
    this.type = type;
    this.libelle = libelle;
  }

  calculerAmortissement(periode) {
    const tauxAmortissement = 0.1;
    const amortissement = this.prix * tauxAmortissement * periode;
    return amortissement;
  }
}
module.exports = Possession;