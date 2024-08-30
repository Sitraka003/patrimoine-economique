const express = require('express');
const { readFile, writeFile } = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const dataPath = path.join(__dirname, '../data/data.json');

app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

// Helper function to read data
const readData = (callback) => {
    readFile(dataPath, 'utf8', (err, data) => { // Use readFile correctly
        if (err) return callback(err);
        try {
            const json = JSON.parse(data);
            callback(null, json);
        } catch (err) {
            callback(err);
        }
    });
};

// Helper function to write data
const writeData = (data, callback) => {
    writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        callback(err);
    });
};

// Get Possession list
app.get('/possessions', (req, res) => {
    readData((err, json) => {
        if (err) return res.status(500).send(err.message);
        const possessions = json.find(model => model.model === 'Patrimoine')?.data.possessions || [];
        res.json(possessions);
    });
});

// Create Possession
app.post('/possession', (req, res) => {
    const newPossession = req.body;
    readData((err, json) => {
        if (err) return res.status(500).send(err.message);
        const patrimoine = json.find(model => model.model === 'Patrimoine');
        if (patrimoine) {
            patrimoine.data.possessions = patrimoine.data.possessions || [];
            patrimoine.data.possessions.push(newPossession);
            writeData(json, (err) => {
                if (err) return res.status(500).send(err.message);
                res.status(201).json(newPossession);
            });
        } else {
            res.status(404).json({ message: 'Patrimoine not found' });
        }
    });
});

// Update Possession by libelle
app.put('/possession/:libelle', (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;
    console.log(`Received PUT request for libelle: ${libelle}, dateFin: ${dateFin}`);

    readData((err, json) => {
        if (err) return res.status(500).send(err.message);

        const patrimoine = json.find(model => model.model === 'Patrimoine');
        if (patrimoine) {
            const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
            if (possession) {
                possession.Fin = dateFin;
                writeData(json, (err) => {
                    if (err) return res.status(500).send(err.message);
                    res.json({ message: 'Possession updated successfully' });
                });
            } else {
                res.status(404).json({ message: 'Possession not found' });
            }
        } else {
            res.status(404).json({ message: 'Patrimoine not found' });
        }
    });
});

// Close Possession
app.put('/possession/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    readData((err, json) => {
        if (err) return res.status(500).send(err.message);
        const patrimoine = json.find(model => model.model === 'Patrimoine');
        if (patrimoine) {
            const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
            if (possession) {
                possession.Fin = new Date().toISOString().split('T')[0]; 
                writeData(json, (err) => {
                    if (err) return res.status(500).send(err.message);
                    res.json({ message: 'Possession closed successfully' });
                });
            } else {
                res.status(404).json({ message: 'Possession not found' });
            }
        } else {
            res.status(404).json({ message: 'Patrimoine not found' });
        }
    });
});

// Delete Possession
app.delete('/possession/:libelle', (req, res) => {
    const { libelle } = req.params;
    readData((err, json) => {
        if (err) return res.status(500).send(err.message);
        const patrimoine = json.find(model => model.model === 'Patrimoine');
        if (patrimoine) {
            const initialLength = patrimoine.data.possessions.length;
            patrimoine.data.possessions = patrimoine.data.possessions.filter(p => p.libelle !== libelle);
            if (patrimoine.data.possessions.length < initialLength) {
                writeData(json, (err) => {
                    if (err) return res.status(500).send(err.message);
                    res.status(200).send('Possession deleted');
                });
            } else {
                res.status(404).json({ message: 'Possession not found' });
            }
        } else {
            res.status(404).json({ message: 'Patrimoine not found' });
        }
    });
});

const port = 3000; // Define the port
app.listen(port, () => console.log(`Server running on port ${port}`));
