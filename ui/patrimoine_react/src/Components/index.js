import Personne from "../../../../models/Personne.js";
import Argent from '../../../../models/possessions/Argent.js'
import TYPE_ARGENT from "../../../../constante.js";
import Flux from "../../../../models/possessions/Flux.js";
import Patrimoine from "../../../../models/Patrimoine.js";
import BienMateriel from "../../../../models/possessions/BienMateriel.js";

const dateToday = new Date();

const ilo = new Personne("Ilo");
const argent1 = new Argent(ilo.nom, "Argent", 400_000, dateToday, null, null, TYPE_ARGENT.Espece);
const argent2 = new Argent(ilo.nom, "Argent", 200_000, dateToday, null, null, TYPE_ARGENT.Epargne);
const argent3 = new Argent(ilo.nom, "Argent", -600_000, dateToday, null, null, TYPE_ARGENT.Courant);
const bienMateriel1 = new BienMateriel(ilo.nom, "Ordinateur", 2_000_000, dateToday, null, 10);
const bienMateriel2 = new BienMateriel(ilo.nom, "Effets vestimentaires", 1_000_000, dateToday, null, 20);
const trainDeVie = new Flux(ilo.nom, "train de vie", -500_000, dateToday, null, null, 14);
const salaire = new Flux(ilo.nom, "salaire", 200_000, dateToday, null, null, dateToday.getDate());

const patrimoine = new Patrimoine(ilo.nom, [argent1, argent2, argent3, bienMateriel1, bienMateriel2, trainDeVie, salaire]);

const json = JSON.stringify(patrimoine);

import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderData = path.resolve(__dirname, '../../../../data');


if (!fs.existsSync(folderData)) {
  fs.mkdirSync(folderData, { recursive: true });
}

const pathFile = path.join(folderData, 'data.json');

fs.writeFile(pathFile, json, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('Update file successfully.');
  }
});