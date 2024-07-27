// Classe représentant les possessions d'une personne
class Possession {
  constructor(cash, savings, checking, computerValue, computerPurchaseDate, clothingValue, clothingEvaluationDate) {
    this.cash = cash;
    this.savings = savings;
    this.checking = checking;
    this.computer = {
      value: computerValue,
      purchaseDate: new Date(computerPurchaseDate),
      depreciationRate: 0.10
    };
    this.clothing = {
      value: clothingValue,
      evaluationDate: new Date(clothingEvaluationDate),
      depreciationRate: 0.20
    };
  }

  // Méthode pour ajouter une nouvelle possession
  addPossession(name, value, depreciationRate, date) {
    this[name] = {
      value: value,
      depreciationRate: depreciationRate,
      purchaseDate: new Date(date)
    };
  }

  // Méthode pour retirer une possession existante
  removePossession(name) {
    delete this[name];
  }
}

module.exports = Possession;
