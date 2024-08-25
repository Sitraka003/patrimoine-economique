import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Possession from '../models/possessions/Possession.js';
import Patrimoine from '../models/Patrimoine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');
let data;
try {
  data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  console.log('Data loaded successfully:', JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Error loading data:', error);
  process.exit(1);
}

const possessionsData = data.find(d => d.model === 'Patrimoine').data.possessions;
const possessions = possessionsData.map(p => new Possession(
  p.possesseur.nom,
  p.libelle,
  p.valeur,
  new Date(p.dateDebut),
  p.dateFin ? new Date(p.dateFin) : null,
  p.tauxAmortissement
));
const patrimoine = new Patrimoine(data.find(d => d.model === 'Patrimoine').data.possesseur.nom, possessions);

app.get('/', (req, res) => {
  res.send("Welcome to John Doe's possession API");
});

app.get('/possession', (req, res) => {
  console.log('GET /possession');
  res.json(patrimoine.possessions);
});

app.post('/possession', (req, res) => {
  const { libelle, valeur, dateDebut, taux } = req.body;
  const newPossession = new Possession(patrimoine.possesseur, libelle, valeur, new Date(dateDebut), null, taux);
  patrimoine.addPossession(newPossession);
  res.status(201).json(newPossession);
});

app.put('/possession/:libelle', (req, res) => {
  const { libelle } = req.params;
  const { dateFin } = req.body;
  const possession = patrimoine.possessions.find(p => p.libelle === libelle);
  if (possession) {
    possession.dateFin = new Date(dateFin);
    res.json(possession);
  } else {
    res.status(404).send('Possession not found');
  }
});

app.post('/possession/:libelle/close', (req, res) => {
  const { libelle } = req.params;
  const possession = patrimoine.possessions.find(p => p.libelle === libelle);
  if (possession) {
    possession.dateFin = new Date();
    res.json(possession);
  } else {
    res.status(404).send('Possession not found');
  }
});

app.get('/patrimoine/:date', (req, res) => {
  const date = new Date(req.params.date);
  const valeur = patrimoine.getValeur(date);
  res.json({ valeur });
});

app.post('/patrimoine/range', (req, res) => {
  const { type, dateDebut, dateFin, jour } = req.body;
  const dateStart = new Date(dateDebut);
  const dateEnd = new Date(dateFin);
  let totalValeur = 0;
  let currentDate = dateStart;

  while (currentDate <= dateEnd) {
    totalValeur += patrimoine.getValeur(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  res.json({ totalValeur });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
