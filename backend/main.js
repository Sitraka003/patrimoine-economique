import express from 'express';
import cors from 'cors';
import { readFile } from '../data/index.js';

const app = express();

app.use(cors());

app.get("/possession", async (request, response) => {
  try {
    const data = await readFile("../UI/public/data.json");
    response.send(data);
  } catch (error) {
    response.status(500).send('Error reading data');
  }
});

app.get("/patrimoine/:valeur", async (request, response) => {
  const valeur = request.params.valeur;
  
    const data = await readFile("../UI/public/data.json");
    const possessions = data.data[1].data.possessions;

    const filterPossession = possessions.filter((possession) => possession.valeur <= valeur);
    response.send(filterPossession);
});

app.post("/possession", async (request, response) => {
  const { libelle, valeur, dateDebut, taux } = request.body;
  if (!libelle || !valeur || !dateDebut || !taux) {
    return response.status(400).json({ error: 'Données incomplètes' });
  }
  response.send({ libelle, valeur, dateDebut, taux }); // Vous pouvez modifier cette ligne selon vos besoins
});

app.listen(3500, () => {
  console.log("Mandeha");
});
