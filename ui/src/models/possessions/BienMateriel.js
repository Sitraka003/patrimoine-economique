import Possession from "./Possession";

export default class BienMateriel extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
  }

  getValeur(date) {
    return super.getValeur(date); 
  }
}


// BienMateriel.js
// import Possession from "./Possession";
// export default class BienMateriel extends Possession {
//   constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
//     super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
//   }

//   getValeur(date) {
//     // Assurez-vous que les dates sont bien des objets Date
//     if (this.dateFin && date > this.dateFin) {
//       date = this.dateFin;
//     }
//     const totalYears = (date.getFullYear() - this.dateDebut.getFullYear()) +
//                         (date.getMonth() - this.dateDebut.getMonth()) / 12;
//     const depreciation = (this.tauxAmortissement / 100) * this.valeur * totalYears;
//     return Math.max(this.valeur - depreciation, 0);
//   }
// }
