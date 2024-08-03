
// Constructeur (constructor):

// Initialise un Patrimoine avec un possesseur (le propriétaire du patrimoine) et une liste de possessions (des objets qui appartiennent au propriétaire).
// getValeur(date):

// Calcule la valeur totale du patrimoine à une date donnée en additionnant les valeurs de toutes les possessions à cette date.
// addPossession(possession):

// Ajoute une nouvelle possession au patrimoine si elle appartient au possesseur. Sinon, affiche un message d'erreur.
// removePossession(possession):

// Supprime une possession du patrimoine en utilisant le libelle (nom) de la possession pour l'identifier.


// export default class Patrimoine {
//   constructor(possesseur, possessions) {
//     this.possesseur = possesseur;
//     this.possessions = [...possessions]; // [Possession, Possession, ...]
//   }
//   getValeur(date) {
//     let result = 0;
//     for (const item of this.possessions) {
//       result += item.getValeur(date);
//     }
//     return result;
//   }


//   addPossession(possession) {
//     if (possession.possesseur != this.possesseur) {
//       console.log(
//         `${possession.libelle} n'appartient pas à ${this.possesseur}`,
//       );
//     } else {
//       this.possessions.push(possession);
//     }
//   }
//   removePossession(possession) {
//     this.possessions = this.possessions.filter(
//       (p) => p.libelle !== possession.libelle,
//     );
//   }
// }

export default class Patrimoine {
  constructor(possesseur, possessions = []) {
    this.possesseur = possesseur;
    this.possessions = [...possessions];
  }

  getValeur(date) {
    let result = 0;
    for (const item of this.possessions) {
      result += item.getValeur(date);
    }
    return result;
  }

  addPossession(possession) {
    if (possession.possesseur !== this.possesseur) {
      console.log(`${possession.libelle} n'appartient pas à ${this.possesseur}`);
    } else {
      this.possessions.push(possession);
    }
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}
