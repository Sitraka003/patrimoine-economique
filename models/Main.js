import Patrimoine from "./Patrimoine.js";
import CompteCourant from "./CompteCourant.js";
import CompteEpargne from "./CompteEpargne.js";
import Especes from "./Especes.js";
import BienMateriel from "./BienMateriel.js";
import TrainDeVie from "./TrainDeVie.js";

const dateInitiale = new Date('2024-05-13');

const especes = new Especes("Ilo", "Espèces", 400000, dateInitiale, 0, 0);

const compteEpargne = new CompteEpargne("Ilo", "Compte Épargne", 200000, dateInitiale, 0, 0, 0.1);

const compteCourant = new CompteCourant("Ilo", "Compte Courant", 600000, dateInitiale, 0, 500000, 0.05);

const ordinateur = new BienMateriel("Ilo", "Ordinateur", 2000000, new Date('2021-10-26'), 0.10);

const effetsVestimentaires = new BienMateriel("Ilo", "Effets Vestimentaires", 1000000, new Date('2024-01-01'), 0.20);

const trainDeVie = new TrainDeVie("Ilo", "Train de Vie", 500000, dateInitiale);

const patrimoine = new Patrimoine("Ilo", [especes, compteEpargne, compteCourant, ordinateur, effetsVestimentaires, trainDeVie]);

const date26Juin2024 = new Date('2024-06-26');
const patrimoine26Juin2024 = patrimoine.getValeur(date26Juin2024);
console.log(`Patrimoine de Ilo le 26 juin 2024 : ${patrimoine26Juin2024} Ar`);

const date14Juillet2024 = new Date('2024-07-14');
const patrimoine14Juillet2024 = patrimoine.getValeur(date14Juillet2024);
console.log(`Patrimoine de Ilo le 14 juillet 2024 : ${patrimoine14Juillet2024} Ar`);

const valeurCompteCourant14Juillet2024 = compteCourant.getValeur(date14Juillet2024);
console.log(`Valeur du compte courant de Ilo le 14 juillet 2024 : ${valeurCompteCourant14Juillet2024} Ar`);
