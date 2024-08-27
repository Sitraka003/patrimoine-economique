import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');

//lecture de data.json
let data;
try {
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  data = JSON.parse(fileData);
} catch (error) {
  console.error('Erreur de chargement des données:', error);
  process.exit(1);
}

//prise des données dans possessions
const possessionsData = data.find(d => d.model === 'Patrimoine').data.possessions;

// Collecte de toutes les possessions
app.get('/possession', (req, res) => {
  const possessions = possessionsData.map(p => ({
    libelle: p.libelle,
    valeur: p.valeur,
    dateDebut: p.dateDebut.split('T')[0],
    dateFin: p.dateFin ? p.dateFin.split('T')[0] : null,
    taux: p.tauxAmortissement
  }));
  res.json(possessions);
});

// ajoute d'une nouvelle possession
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
app.delete('/possession/:libelle/close', (req, res) => {
  console.log('Request to delete possession:', req.params.libelle);
  const { libelle } = req.params;

  const index = possessionsData.findIndex(p => p.libelle === libelle);
  
  if (index !== -1) {
    possessionsData.splice(index, 1);
    
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      res.json({ message: 'Possession successfully deleted' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Server error');
    }
  } else {
    console.log('Possession not found:', libelle);
    res.status(404).send('Possession not found');
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Serveur en fonctionnement sur le port ${PORT}`);
});
