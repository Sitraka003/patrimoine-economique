class Possession {
  constructor(possesseur, type, libelle, valeur, dateAcquisition,amortissable=true) {
  this.possesseur = possesseur;
  this.type = type; // e.g., 'argent', 'biens', 'matériel', etc.
  this.libelle = libelle;
  this.valeur = valeur; // Valeur actuelle ou initiale
  this.dateAcquisition = dateAcquisition; // Date d'acquisition pour calcul de l'amortissement
  this.amortissable = amortissable;//Indique si la possession est ammortissable ou pas.
  }
  }
  module.exports = Possession;
  