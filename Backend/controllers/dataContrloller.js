const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const { readData, writeData } = require("../data");
const dataJson = (req, res) => {
    const filePath = path.join(__dirname, '../data/data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la lecture du fichier", error: err.message });
        }
        res.json(JSON.parse(data));
    });
};


router.get("/data", dataJson);

module.exports = router;
