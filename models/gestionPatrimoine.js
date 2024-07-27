const Patrimoine = require('./patrimoine');
const Possession = require('./possession');
const Revenu = require('./revenu');

class GestionPatrimoine {
  constructor(cash, savings, checking, computerValue, computerPurchaseDate, clothingValue, clothingEvaluationDate, monthlyExpenses, monthlyIncome) {
    this.possessions = new Possession(cash, savings, checking, computerValue, computerPurchaseDate, clothingValue, clothingEvaluationDate);
    this.monthlyExpenses = monthlyExpenses;
    this.revenu = new Revenu(monthlyIncome);
  }

  // Méthode pour calculer le patrimoine à une date donnée
  calculatePatrimoine(date) {
    return Patrimoine.calculateTotalAssets(this.possessions, this.monthlyExpenses, date, this.revenu.monthlyIncome);
  }

  // Méthode pour ajouter une nouvelle possession
  addPossession(name, value, depreciationRate, date) {
    this.possessions.addPossession(name, value, depreciationRate, date);
  }

  // Méthode pour retirer une possession existante
  removePossession(name) {
    this.possessions.removePossession(name);
  }

  // Méthode pour ajouter des revenus mensuels
  addMonthlyIncome(income) {
    this.revenu.addMonthlyIncome(income);
  }
}

module.exports = GestionPatrimoine;
