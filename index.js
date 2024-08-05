import Personne from "./models/Personne.js";
import Argent from './models/possessions/Argent.js'
import TYPE_ARGENT from "./constante.js";
import Flux from "./models/possessions/Flux.js";
import Patrimoine from "./models/Patrimoine.js";
// import Possession from "./models/possessions/Possession.js";
import BienMateriel from "./models/possessions/BienMateriel.js";
import fs from 'fs' ;
import path from 'path'
const folderDAta = './data';

if (!fs.existsSync(folderDAta)) {
    fs.mkdirSync(folderDAta);
}

const pathFile = path.join(folderDAta, 'data.json');


const ilo = new Personne("Ilo");
const argent1 = new Argent(ilo.nom, "especes", 400_000, new Date("2024-5-13"), null, null, TYPE_ARGENT.Espece);
const argent2 = new Argent(ilo.nom, "epargne", 200_000, new Date("2024-5-13"), null, null, TYPE_ARGENT.Epargne);
const argent3 = new Argent(ilo.nom, "courant", -600_000, new Date("2024-5-13"), null, null, TYPE_ARGENT.Courant);
const bienMateriel1 = new BienMateriel(ilo.nom, "Ordinateur", 2_000_000, new Date("2021-10-26"), null, 10);
const bienMateriel2 = new BienMateriel(ilo.nom, "Effets vestimentaires", 1_000_000, new Date("2024-1-1"), null, 20);
const trainDeVie = new Flux(ilo.nom, "train de vie", -500_000, new Date("2024-5-13"), null, null, 14);
const salaire = new Flux(ilo.nom, "salaire", 200_000, new Date("2024-1-1"), null, null, 2);

const patrimoine = new Patrimoine(ilo.nom, [argent1, argent2, argent3, bienMateriel1, bienMateriel2, trainDeVie]);
// console.log(patrimoine.getValeur(new Date("2024-6-26")));
// console.log(bienMateriel1.getValeur(new Date("2024-6-26")));
// console.log(bienMateriel2.getValeur(new Date("2024-6-26")));

const json = JSON.stringify(patrimoine);
// patrimoine.addPossession(argent1)
// patrimoine.addPossession(argent2)
// patrimoine.addPossession(argent3)
// patrimoine.addPossession(bienMateriel1)
// patrimoine.addPossession(bienMateriel2)
// patrimoine.addPossession(trainDeVie);
// const jsonArgent = (object) => {
//   const argentJson = JSON.stringify(object);
//   return argentJson;
// }

fs.writeFile(pathFile, json, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File has been written successfully.');
  }
});