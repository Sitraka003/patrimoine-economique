const Revenu = require('./revenu');

class Patrimoine {
  // Méthode pour calculer la dépréciation linéaire d'un objet en fonction de son taux et des dates
  static depreciate(value, rate, fromDate, toDate) {
    const daysElapsed = (toDate - fromDate) / (1000 * 60 * 60 * 24);
    const yearlyDepreciation = value * rate;
    const dailyDepreciation = yearlyDepreciation / 365;
    return value - (dailyDepreciation * daysElapsed);
  }

  // Méthode pour mettre à jour les soldes des comptes en fonction des dépenses mensuelles et des intérêts
  static calculateBalances(possessions, monthlyExpenses, currentDate) {
    const startDate = new Date('2024-05-13');
    const monthsElapsed = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());

    // Mise à jour du compte épargne avec les intérêts mensuels
    const savingsInterestRate = 0.05 / 12; // 5% annuel converti en mensuel
    possessions.savings *= Math.pow(1 + savingsInterestRate, monthsElapsed);

    return possessions;
  }

  // Méthode pour calculer la valeur totale des actifs à une date donnée
  static calculateTotalAssets(possessions, monthlyExpenses, date, monthlyIncome) {
    let assets = { ...possessions };

    // Dépréciation de l'ordinateur
    assets.computer.value = this.depreciate(assets.computer.value, assets.computer.depreciationRate, assets.computer.purchaseDate, date);

    // Dépréciation des vêtements
    assets.clothing.value = this.depreciate(assets.clothing.value, assets.clothing.depreciationRate, assets.clothing.evaluationDate, date);

    // Mise à jour des soldes des comptes avec les revenus
    assets = Revenu.updateBalances(assets, monthlyExpenses, monthlyIncome, date);

    // Mise à jour des soldes des comptes avec les intérêts
    assets = this.calculateBalances(assets, monthlyExpenses, date);

    // Calcul du total des actifs
    const totalAssets = assets.cash + assets.savings + assets.checking + assets.computer.value + assets.clothing.value;

    return {
      totalAssets: totalAssets,
      checking: assets.checking
    };
  }
}

module.exports = Patrimoine;
