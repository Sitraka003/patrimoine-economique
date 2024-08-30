import Possession from "./Possession.js";

export default class BienMateriel extends Possession {
  constructor(id, possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    super(id, possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
  }

  getValeur(date) {

    if (this.dateFin == this.dateDebut || this.dateFin <= new Date) {
      return 0;
    } else {


      function CalculateDepreciationEvolution(value, depreciationRate, startDate, endDate) {


        function daysBetweenDates(d1, d2) {
          const diffTime = Math.abs(d2 - d1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays;
        }

        //Formule Math Financière 
        let nbrDay = daysBetweenDates(startDate, endDate);
        let DailyDepreciationRate = Math.pow((1 - depreciationRate / 100), (1 / 365)) - 1
        let DepreciationResult = value * (Math.pow((1 + DailyDepreciationRate), nbrDay));
        return DepreciationResult;


      }

      let result = CalculateDepreciationEvolution(this.valeur, this.tauxAmortissement, this.dateDebut, date);

      return +result.toFixed(2);

    }
  }
}
