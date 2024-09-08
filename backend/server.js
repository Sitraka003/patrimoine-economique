import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import Flux from './models/possessions/Flux.js';
import Patrimoine from './models/Patrimoine.js';
import Possession from './models/possessions/Possession.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173/',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type, Authorization'],
}));

const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');

// Lecture des données de data.json
let data;
try {
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  data = JSON.parse(fileData);
} catch (error) {
  console.error('Erreur de chargement des données:', error);
  process.exit(1);
}

// Prise des données dans possessions
const possessionsData = data.find(d => d.model === 'Patrimoine').data.possessions;

// Collecte de toutes les possessions avec la valeur actuelle calculée
app.get('/possession', (req, res) => {
  const today = new Date();

  const possessions = possessionsData.map(p => {
    const possession = p.jour
      ? new Flux(
        p.possesseur,
        p.libelle,
        p.valeurConstante,
        new Date(p.dateDebut),
        p.dateFin ? new Date(p.dateFin) : null,
        p.tauxAmortissement,
        p.jour
      )
      : new Possession(
        p.possesseur,
        p.libelle,
        p.valeur,
        new Date(p.dateDebut),
        p.dateFin ? new Date(p.dateFin) : null,
        p.tauxAmortissement
      );

    const valeurActuelle = possession.getValeur(today);

    return {
      libelle: p.libelle,
      valeur: p.valeur,
      dateDebut: p.dateDebut.split('T')[0],
      dateFin: p.dateFin ? p.dateFin.split('T')[0] : null,
      taux: p.tauxAmortissement,
      valeurActuelle: valeurActuelle.toFixed(2)
    };
  });

  res.json(possessions);
});

// ajout d'une nouvelle possession
app.post('/possession', (req, res) => {
  const { libelle, valeur, dateDebut, taux } = req.body;
  const newPossession = {
    libelle,
    valeur,
    dateDebut,
    dateFin: null,
    tauxAmortissement: taux
  };
  possessionsData.push(newPossession);
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.status(201).json(newPossession);
  } catch (error) {
    console.error('Erreur de sauvegarde des données:', error);
    res.status(500).send('Erreur serveur');
  }
});

//mettre à jour une possession
app.put('/possession/:libelle', (req, res) => {
  const { libelle } = req.params;
  const { valeur, dateDebut, dateFin, taux } = req.body;
  const possession = possessionsData.find(p => p.libelle === libelle);

  if (possession) {
    possession.valeur = valeur;
    possession.dateDebut = dateDebut;
    possession.dateFin = dateFin || null;
    possession.tauxAmortissement = taux;
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      res.json(possession);
    } catch (error) {
      console.error('Erreur de sauvegarde des données:', error);
      res.status(500).send('Erreur serveur');
    }
  } else {
    res.status(404).send('Possession non trouvée');
  }
});

//clôture d'une possession
app.patch('/possession/:libelle/close', (req, res) => {
  console.log('Request to close possession:', req.params.libelle);
  const { libelle } = req.params;

  const possession = possessionsData.find(p => p.libelle === libelle);

  if (possession) {
    possession.dateFin = new Date().toISOString().split('T')[0];

    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      res.json({ message: 'Possession cloture avec', possession });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Server error');
    }
  } else {
    console.log('Possession not found:', libelle);
    res.status(404).send('Possession not found');
  }
});

// supprimer une possession
app.delete('/possession/:libelle', (req, res) => {
  const { libelle } = req.params;

  const index = possessionsData.findIndex(p => p.libelle === libelle);

  if (index !== -1) {
    possessionsData.splice(index, 1);

    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      res.json({ message: 'Possession supprime avec succes' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Server error');
    }
  } else {
    res.status(404).send('Possession not found');
  }
});

app.post('/patrimoine/range', (req, res) => {
  const { dateDebut, dateFin, type, jour } = req.body;
  const startDate = new Date(dateDebut);
  const endDate = new Date(dateFin);
  const patrimoineData = data.find(d => d.model === 'Patrimoine');

  if (!patrimoineData) {
    return res.status(404).send('Patrimoine not found');
  }

  const possessions = patrimoineData.data.possessions.map(p => {
    return p.jour
      ? new Flux(p.possesseur, p.libelle, p.valeurConstante, new Date(p.dateDebut), p.dateFin ? new Date(p.dateFin) : null, p.tauxAmortissement, p.jour)
      : new Possession(p.possesseur, p.libelle, p.valeur, new Date(p.dateDebut), p.dateFin ? new Date(p.dateFin) : null, p.tauxAmortissement);
  });

  const patrimoine = new Patrimoine(patrimoineData.data.possesseur.nom, possessions);
  let currentDate = startDate;
  const results = [];

  while (currentDate <= endDate) {
    const valeur = patrimoine.getValeur(currentDate);
    results.push({ date: currentDate.toISOString().split('T')[0], valeur });

    if (type === 'month') {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
      currentDate.setDate(currentDate.getDate() + jour);
    }
  }

  res.json(results);
});

app.listen(9000, () => {
  console.log('Serveur démarré sur le port 9000');
});