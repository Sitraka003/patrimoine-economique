const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const possessionsFilePath = path.join(__dirname, 'public', 'possession.json');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/possession', (req, res) => {
  fs.readFile(possessionsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/possession', (req, res) => {
  fs.readFile(possessionsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const possessions = JSON.parse(data);
    const newPossession = req.body;
    possessions.push(newPossession);
    fs.writeFile(possessionsFilePath, JSON.stringify(possessions, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.status(201).json(newPossession);
    });
  });
});

app.delete('/api/possession/:libelle', (req, res) => {
  fs.readFile(possessionsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const possessions = JSON.parse(data);
    const libelle = req.params.libelle;
    const updatedPossessions = possessions.filter(pos => pos.libelle !== libelle);
    fs.writeFile(possessionsFilePath, JSON.stringify(updatedPossessions, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.status(204).end();
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
