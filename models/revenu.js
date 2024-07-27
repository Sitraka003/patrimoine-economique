class Revenu {
    constructor(monthlyIncome) {
      this.monthlyIncome = monthlyIncome;
    }
  
    // Méthode pour ajouter des revenus mensuels
    addMonthlyIncome(income) {
      this.monthlyIncome = income;
    }
  
    // Méthode pour mettre à jour les soldes des comptes en fonction des revenus et des dépenses mensuelles
    static updateBalances(possessions, monthlyExpenses, monthlyIncome, currentDate) {
      const startDate = new Date('2024-05-13');
      const monthsElapsed = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
  
      // Mise à jour du compte courant avec les revenus et les dépenses mensuels
      possessions.checking += (monthlyIncome - monthlyExpenses) * monthsElapsed;
  
      return possessions;
    }
  }
  
  module.exports = Revenu;
  