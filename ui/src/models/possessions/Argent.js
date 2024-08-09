import Possession from "./Possession.js";

export const TYPE_ARGENT = {
  Courant: "Courant",
  Epargne: "Epargne",
  Espece: "Espece"
};

export default class Argent extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    try {
      // Ajout du contrôle pour le type
      if (!Object.values(TYPE_ARGENT).includes(type)) {
        throw new Error("Type d'argent invalide");
      }
      this.type = type;
    } catch (e) {
      console.error(e);
    }
  }
}

// // Argent.js
// import Possession from "./Possession";
// export default class Argent extends Possession {
//   constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour, valeurConstante) {
//     super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
//     this.jour = jour;
//     this.valeurConstante = valeurConstante;
//   }

//   getValeur(date) {
//     if (this.dateFin && date > this.dateFin) {
//       date = this.dateFin;
//     }

//     const nombreDeMois = (debut, dateEvaluation, jourJ) => {
//       let compteur = 0;
//       if (debut.getDate() < jourJ) compteur++;
//       if (dateEvaluation.getDate() >= jourJ &&
//           !(debut.getFullYear() === dateEvaluation.getFullYear() &&
//           debut.getMonth() === dateEvaluation.getMonth())) {
//         compteur++;
//       }
//       let totalMois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 +
//                        (dateEvaluation.getMonth() - debut.getMonth()) - 1;
//       compteur += Math.max(0, totalMois);
//       return compteur;
//     };

//     return nombreDeMois(this.dateDebut, date, this.jour) * this.valeurConstante;
//   }
// }
