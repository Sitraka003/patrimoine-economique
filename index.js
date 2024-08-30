import express, { json } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url'; 
import cors from 'cors';  
import Patrimoine from './models/Patrimoine.js';
import Possession from './models/possessions/Possession.js';
import BienMateriel from './models/possessions/BienMateriel.js';
import Flux from './models/possessions/Flux.js';
import Personne from './models/Personne.js';
import { log } from 'console';
import { loadavg } from 'os';


const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type'],  
  }));


// Chemin vers le fichier JSON
const dataFilePath = join(__dirname, 'data', 'data.json');


// Fonction pour lire les utilisateurs du fichier
const readUsersFromFile = () => {
    try {
        const data = readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading users file:', err);
        return [];
    }
};

// Fonction pour écrire les utilisateurs dans le fichier
const writeUsersToFile = (users) => {
    try {
        writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error writing to users file:', err);
    }
};

const JohnDoe = new Personne("John Doe");

// Route GET pour récupérer tous les possessions.
app.get('/api/possessions', (req, res) => {
    const data = readUsersFromFile();
    const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions;
    res.json(possessions);
});

// Route POST pour ajouter une nouvelle possessions
app.post('/api/BienMateriel', (req, res) => {
    const {libelle, valeur, dateDebut, dateFin, tauxAmortissement} = req.body;
    let data = readUsersFromFile();
    const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions;
    const id = possessions.length > 0 ? possessions[possessions.length - 1].id + 1 : 1;
    const newPossession = new BienMateriel(id, JohnDoe, libelle, valeur, dateDebut, dateFin, tauxAmortissement);

    possessions.push(newPossession);
    writeUsersToFile(data);

    res.json({ possession: newPossession});

});


app.post('/api/Flux', (req, res) => {
    const {libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour} = req.body;
    let data = readUsersFromFile();
    const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions;
    const id = possessions.length > 0 ? possessions[possessions.length - 1].id + 1 : 1;
    const newPossession = new Flux(id, JohnDoe, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour);

    possessions.push(newPossession);
    writeUsersToFile(data);

    res.json({ possession: newPossession});

})

app.put('/api/BienMateriel/:id', (req, res) => {
    const { id } = req.params;
    const {libelle, valeur, dateDebut, dateFin, tauxAmortissement} = req.body;
    let data = readUsersFromFile();
    const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions;
    const possession = possessions.find(possession => possession.id === parseInt(id));

    if(possession){
        possession.libelle = libelle;
        possession.valeur = valeur,
        possession.dateDebut = new Date(dateDebut);
        possession.dateFin = new Date(dateFin);
        possession.tauxAmortissement = tauxAmortissement;
        writeUsersToFile(data);
        res.json({ message: `Possession ${id} updated successfully`, possession });
    }else{
        res.status(404).json({ message: `User with ID ${id} not found` });
    }
})

app.put('/api/Flux/:id', (req, res) => {
    const { id } = req.params;
    const {libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour} = req.body;
    let data = readUsersFromFile();
    const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions;
    const possession = possessions.find(possession => possession.id === parseInt(id));

    if(possession){
        possession.libelle = libelle;
        possession.valeurConstante = valeur,
        possession.dateFin = new Date(dateDebut);
        possession.dateDebut = new Date(dateFin);
        possession.tauxAmortissement = tauxAmortissement;
        possession.jour = jour;
        writeUsersToFile(data);
        res.json({ message: `Possession ${id} updated successfully`, possession });
    }else{
        res.status(404).json({ message: `User with ID ${id} not found` });
    }
})

app.delete('/api/possessions/:id', (req, res) => {
    const { id } = req.params;
    let data = readUsersFromFile();
    const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions;
    const possessionIndex = possessions.findIndex(possession => possession.id === parseInt(id));

    if (possessionIndex !== -1) {
        possessions.splice(possessionIndex, 1);
        writeUsersToFile(data);
        res.json({ message: `Posssession ${id} deleted successfully` });
    } else {
        res.status(404).json({ message: `Possession with ID ${id} not found` });
    }
})

app.post('/api/getValeur', (req, res) => {
    const { dates }  = req.body;
    let data = readUsersFromFile();
    const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions;
    console.log(possessions);
    console.log(dates);
    const patrimoine = new Patrimoine(JohnDoe, possessions);    
    const values = dates.map(date => patrimoine.getValeur(new Date(date)));
    res.json({ values: values, message: `Values retrieved successfully` });
});



// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


