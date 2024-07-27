const Personne = require('./Personne');
const Patrimoine = require('./Patrimoine');
const Argent = require('./typeOfPossessions/Argent');
const BienMateriel = require('./typeOfPossessions/BienMateriel');
const TrainDeVie = require('./typeOfPossessions/TrainDeVie');

// Création de la personne Ilo
const ilo = new Personne('Ilo');

// Création des possessions
const especes = new Argent(ilo, 'especes', 400000);
const compteEpargne = new Argent(ilo, 'compte_epargne', 20000, '2024-01-01', 0, 0, '2023-06-01', 5);
//salaire : 600 000ar
const compteCourant = new Argent(ilo, 'compte_courant', 0, '2024-01-01', 600000, 500000);
const ordinateur = new BienMateriel(ilo, 'ordinateur', 2000000, '2021-10-26', 10);
const effetsVestimentaires = new BienMateriel(ilo, 'effets_vestimentaires', 1000000, '2024-01-01', 20);
const trainDeVie = new TrainDeVie(ilo, 'train_de_vie', 500000);

// Création du patrimoine
const patrimoine = new Patrimoine(ilo, '2024-05-13', [especes, compteEpargne, compteCourant, ordinateur, effetsVestimentaires, trainDeVie]);

const valeur26Juin2024 = patrimoine.getValeur('2024-06-26');
console.log(`Valeur du patrimoine le 26 juin 2024 : ${valeur26Juin2024} Ar`);

const valeur14Juillet2024 = patrimoine.getValeur('2024-07-14');
console.log(`Valeur du patrimoine le 14 juillet 2024 : ${valeur14Juillet2024} Ar`);

const montantCompteCourant14Juillet = compteCourant.getValeur('2024-07-14');
console.log(`Montant sur le compte courant le 14 juillet 2024 : ${montantCompteCourant14Juillet} Ar`);

const montantCompteEpargne14Juillet = compteEpargne.getValeur('2024-07-14');
console.log(`Montant sur le compte courant le 14 juillet 2024 : ${montantCompteEpargne14Juillet} Ar`);
