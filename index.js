import Personne from "./models/Personne.js";
import fs from 'fs' ;
import path from 'path';

const Ilo = new Personne("Ilo");
const json = JSON.stringify(Ilo);

const folderDAta = './data';

if (!fs.existsSync(folderDAta)) {
    fs.mkdirSync(folderDAta);
}

const pathFile = path.join(folderDAta, 'data.json');

fs.writeFile(pathFile, json, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File has been written successfully.');
    }
  });