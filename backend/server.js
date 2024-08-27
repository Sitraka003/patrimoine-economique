const express = require('express');
const app = express();
app.use(express.json());

let possessions = [];
let patrimoineData = [];

// Get Possession list
app.get('/possession', (req, res) => {
    res.json(possessions);
});

// Create Possession
app.post('/possession', (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;
    possessions.push({ libelle, valeur, dateDebut, taux });
    res.status(201).json({ message: 'Possession created successfully' });
});

// Update Possession by libelle
app.put('/possession/:libelle', (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;
    const possession = possessions.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = dateFin;
        res.json({ message: 'Possession updated successfully' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

// Close Possession
app.put('/possession/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    const possession = possessions.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = new Date();
        res.json({ message: 'Possession closed successfully' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

// Get Valeur Patrimoine by date
app.get('/patrimoine/:date', (req, res) => {
    const { date } = req.params;
    const patrimoine = patrimoineData.find(p => p.date === date);
    if (patrimoine) {
        res.json(patrimoine.valeur);
    } else {
        res.status(404).json({ message: 'Patrimoine not found' });
    }
});

// Get Valeur Patrimoine Range
app.post('/patrimoine/range', (req, res) => {
    const { type, dateDebut, dateFin, jour } = req.body;
    const result = patrimoineData.filter(p => {
        const pDate = new Date(p.date);
        return pDate >= new Date(dateDebut) && pDate <= new Date(dateFin) && pDate.getDate() === jour;
    });
    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});